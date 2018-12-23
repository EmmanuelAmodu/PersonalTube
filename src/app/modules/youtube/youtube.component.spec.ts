import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
    getTrendingVideos(num) {
      return Observable.of(Array<VideoClass>(num));
    }
  };
  window.addEventListener("scroll", function(evt) { window.scrollTo(0, document.body.scrollHeight); });
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
               WindowRef
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    spyOn(component, "videosfunc").and.callThrough();
    spyOn(component, "onScroll").and.callThrough();
    spyOn(component, "loadMoreVideos").and.callThrough();
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

  it('should do load more videos on page end', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(component.loadMoreVideos)
        .toHaveBeenCalled();
  });

  it('should get videos with query params', () => {
    expect(component.videos.length)
        .toBe(2);
  });

  it('should get videos with specific argument', () => {
    component.videosfunc(50);
    expect(component.videos.length)
        .toBe(50);
  });

  it('should display videos list on the DOM', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".row").childElementCount)
        .toBe(4);
  });
});
