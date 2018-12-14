import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
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
  public params: any = {
    videosPerPage: 0, saveToken: false, token: "", country: "", catg: ""
  }
  
  constructor(private youtubeService: YoutubeService,
              private appContext: ContextService, 
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.appContext.moduleTitle.next('YOUTUBE');

    this.route.queryParams.subscribe(data => this.videosfunc(data.count, data.country, data.category));
    
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
        this.appContext.pageToken.subscribe(function(token) {
            count-=50;
            this.params.videosPerPage = count > 50 ? 50 : count;
            this.params.token = token;
            if (count > 0)
                this.getVideos(this.params).subscribe(data => this.videos.push(...data));
        }.bind(this));
    }
  }

  private getVideos(params) {
    return this.youtubeService.getTrendingVideos(params.videosPerPage, params.saveToken, params.token, params.country, params.catg)
    .pipe(
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      })
    );
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    console.log('scrolled');
  }
}
