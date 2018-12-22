import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatProgressBarModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import { YoutubeComponent } from './youtube.component';
import { YoutubeService } from './service/youtube.service';
import { ContextService } from '@shared/context.service';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import { VideoClass } from '@modules/youtube/models/video.class';
import { WindowRef } from 'src/app/service/window-ref';
import { ActivatedRoute } from '@angular/router';
import { DocumentRef } from 'src/app/service/document-ref';

@Component({
  selector: 'app-video-component',
  template: ''
})
class VideoComponent {
  @Input() public video: VideoClass;
}

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;
  const service = {
    getTrendingVideos() {
      return Observable.of([]);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ YoutubeComponent, VideoComponent ],
             imports     : [
               RouterTestingModule,
               MatButtonModule,
               MatIconModule,
               MatSidenavModule,
               MatProgressBarModule,
               MomentModule
             ],
             providers   : [
               {provide: YoutubeService, useValue: service},
               {
                provide: ActivatedRoute,
                useValue: {
                    queryParams: Observable.of({
                        count: 2,
                        country: "",
                        category: ""
                    })
                }
             },
               ContextService, 
               WindowRef,
               DocumentRef
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    spyOn(component, "videosfunc");
    spyOn(component, "onScroll");
    spyOn(component, "loadMoreVideos");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
  
  it('should load trending videos', () => {
    expect(component.videosfunc)
        .toHaveBeenCalled();
  });

  it('should do something on window scroll', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(component.onScroll)
        .toHaveBeenCalled();
  });

});
