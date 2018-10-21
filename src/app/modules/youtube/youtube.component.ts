import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { ActivatedRoute } from "@angular/router";
 
import { YoutubeService } from './service/youtube.service';
import { ContextService } from '@shared/context.service';
import { VideoClass } from './models/video.class';

@Component({
  selector   : 'app-youtube-component',
  templateUrl: './youtube.component.html',
  styleUrls  : [ './youtube.component.scss' ]
})

export class YoutubeComponent implements OnInit {
  public loadingError$ = new Subject<boolean>();
  public videos: VideoClass[] = [];
  public showPigBtn: boolean;

  private lastToken: string = "";

  constructor(private youtubeService: YoutubeService,
              private appContext: ContextService, 
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.appContext.moduleTitle.next('YOUTUBE');

    this.route.params.subscribe(data => {
      this.videosfunc(50, data.code);
    });
    
    this.appContext.videosCount.subscribe(count => this.videosfunc(count));
    const code = this.route.snapshot.paramMap.get("code");
    this.appContext.pageToken.subscribe(token => this.lastToken = token);
    
  }

  private videosfunc(count, code?) {
    this.videos = [];
    this.getVideos(50, '', code).subscribe(data => this.videos.push(...data));
    if (count > 50) {
      this.loadVideos(count);
    }
  }

  loadMoreVideos() {
    this.lastToken ? 
      this.getVideos(50, this.lastToken).subscribe(data => this.videos.push(...data))
      : alert("End of videos");
  }

  loadVideos(count) {
    this.appContext.pageToken.subscribe(token => {
      count -= 50;
      if (count > 0) {
        // TODO: Fix new bug will not load less then 50 contents
        let vidnum = (count < 50 && count > 0) ? count : 50;
        this.getVideos(vidnum, token).subscribe(data => this.videos.push(...data))
      }
    });
  }

  private getVideos(videosPerPage?: number, token?: string, code?: string) {
    return this.youtubeService.getTrendingVideos(videosPerPage, token, code)
    .pipe(
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      })
    );
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    this.loadMoreVideos();
  }
}
