import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material';

import { VideoComponent } from '@modules/youtube/components/video.component';
import { VideoClass } from '@modules/youtube/models/video.class';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let compiled: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ VideoComponent ],
             imports     : [
               RouterTestingModule,
               MatIconModule
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    component.video = new VideoClass({
      id        : 123,
      snippet   : {
        title      : 'Test title',
        thumbnails : {
          high: {
            url: 'http://test.com'
          }
        },
        publishedAt: new Date()
      },
      statistics: {
        viewCount: 561,
        likeCount: 546
      }
    });
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should display publishedAt on the DOM', () => {
    expect(compiled.querySelector(".publishedAt").querySelector("span").textContent)
        .toBe("a few seconds ago");
  });

  it('should display viewCount on the DOM', () => {
    expect(compiled.querySelector(".viewCount").querySelector("span").textContent)
        .toBe("561");
  });

  it('should display likeCount on the DOM', () => {
    expect(compiled.querySelector(".likeCount").querySelector("span").textContent)
        .toBe("546");
  });

  it('should display title on the DOM', () => {
    expect(compiled.querySelector(".video-title.text-ellipsis").textContent)
        .toBe(" Test title ");
  });

  it('should load image', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("img").src)
        .toBe("http://test.com/");
  });
});
