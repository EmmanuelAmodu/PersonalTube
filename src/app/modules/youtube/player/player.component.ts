import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { appConfig } from 'appConfig';

@Component({
  selector   : 'app-player',
  templateUrl: './player.component.html',
  styleUrls  : [ './player.component.scss' ]
})
export class PlayerComponent implements OnInit {
  private embedUrl: SafeResourceUrl;
  public videoLoader: boolean;

  constructor(private sanitizer: DomSanitizer, 
              private route: ActivatedRoute) {}

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get("videoId");
    if (!id.length) {
      return;
    }
    this.videoLoader = true;
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(appConfig.getYoutubeEmbdedUrl(id));
  }

  /* On video ready hide loader */
  public loadVideo(el): void {
    this.videoLoader = false;
  }

}
