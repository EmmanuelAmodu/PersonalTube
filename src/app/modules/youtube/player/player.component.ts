import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { appConfig } from 'appConfig';
import { YoutubeService } from '../service/youtube.service';
import { ContextService } from '@shared/context.service';

@Component({
  selector   : 'app-player',
  templateUrl: './player.component.html',
  styleUrls  : [ './player.component.scss' ]
})
export class PlayerComponent implements OnInit, OnDestroy {
  private embedUrl: SafeResourceUrl;
  public videoLoader: boolean;

  constructor(private sanitizer: DomSanitizer, 
              private route: ActivatedRoute,
              private router: Router,
              private youtubeService: YoutubeService,
              private appContext: ContextService ) {}

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get("videoId");
    if (!id.length) this.backToList();
    this.youtubeService.checkVideoExist(id).subscribe(data => {
        if (data.items.length > 0) {
              this.videoLoader = true;
              this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(appConfig.getYoutubeEmbdedUrl(id));
        }
        else this.backToList();
    });

    this.appContext.hideFilter.next(true);
  }

  public ngOnDestroy(): void {
    this.appContext.hideFilter.next(false);
  }

  backToList(){
    this.router.navigate(['/youtube']);
  }

  /* On video ready hide loader */
  public loadVideo(): void {
    this.videoLoader = false;
  }

}
