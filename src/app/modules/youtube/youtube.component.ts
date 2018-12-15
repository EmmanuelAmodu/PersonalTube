import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { ActivatedRoute } from "@angular/router";
 
import { YoutubeService } from './service/youtube.service';
import { ContextService } from '@shared/context.service';
import { VideoClass } from './models/video.class';
import { WindowRef } from 'src/app/service/window-ref';
import { GetVidoesParam } from './models/get-vidoes-param';

@Component({
  selector   : 'app-youtube-component',
  templateUrl: './youtube.component.html',
  styleUrls  : [ './youtube.component.scss' ]
})

export class YoutubeComponent implements OnInit {
  @ViewChild('bottomEl') bottomEl: ElementRef; 
  private inPosition: boolean;
  private nextTokenInf: string;
  public loadingError$ = new Subject<boolean>();
  public videos: VideoClass[] = [];
  public params: GetVidoesParam = new GetVidoesParam();
  
  constructor(private youtubeService: YoutubeService,
              private appContext: ContextService, 
              private route: ActivatedRoute,
              private winRef: WindowRef ) {
  }

  public ngOnInit(): void {
    this.appContext.moduleTitle.next('YOUTUBE');
    this.route.queryParams.subscribe(data => this.videosfunc(data.count, data.country, data.category));
    this.appContext.infPageToken.subscribe(d => this.nextTokenInf = d);
  }

  private videosfunc(count: number, country?: string, catg?: string) {
    this.videos = [];
    this.params.videosPerPage = count;
    this.params.saveToken = false;
    this.params.token = "";
    this.params.country = country;
    this.params.catg = catg;

    if (count <= 50) {
        this.getVideos(this.params).subscribe(data => this.videos.push(...data));
    }
    else {
        this.params.videosPerPage = 50;
        this.params.saveToken = true;

        this.getVideos(this.params).subscribe(data => this.videos.push(...data));
        this.appContext.pageToken.subscribe((function(token) {
            count-=50;
            this.params.videosPerPage = count > 50 ? 50 : count;
            this.params.token = token;
            if (count > 0)
                this.getVideos(this.params).subscribe(data => this.videos.push(...data));
        }).bind(this));
    }
  }

  private getVideos(params: GetVidoesParam) {
    return this.youtubeService.getTrendingVideos(params.videosPerPage, params.saveToken, params.token, params.country, params.catg)
    .pipe(
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      })
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
      let inPosition = this.isSrollIntoViewPoint(
          this.bottomEl.nativeElement, 
          this.winRef.nativeWindow, 
          $event.srcElement
      );
      if (this.inPosition !== inPosition) {
          this.inPosition = inPosition;
          if (this.inPosition) this.loadMoreVideos();
      }
  }

  public isSrollIntoViewPoint(el, win, doc) {
    var bounding = el.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (win.innerHeight || doc.documentElement.clientHeight) &&
        bounding.right <= (win.innerWidth || doc.documentElement.clientWidth)
    );
  }

  private loadMoreVideos() {
      this.params.videosPerPage = 50;
      this.params.token = this.nextTokenInf;
      this.params.saveToken = false;
      if (this.nextTokenInf)
        this.getVideos(this.params).subscribe(data => this.videos.push(...data));
  }
}
