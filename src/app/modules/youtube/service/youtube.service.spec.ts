import { TestBed, async, inject } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ContextService } from '@shared/context.service';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ YoutubeService, ContextService, HttpClient ],
      imports  : [ HttpClientModule ]
    });
  });

  it('should ...', inject([ YoutubeService ], (service: YoutubeService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should get 50 vidoes by default', async(inject([ YoutubeService ], (service: YoutubeService) => {
      service.getTrendingVideos().toPromise().then(d => {
        expect(d.length).toBe(50);
      });
  })));

  it('should get any number vidoes', async(inject([ YoutubeService ], (service: YoutubeService) => {
    service.getTrendingVideos(25, false, "CDIQAA", "AI", '2').toPromise().then(d => {
      expect(d.length).toBe(25);
    });
  })));

  it('should check video exist', async(inject([ YoutubeService ], (service: YoutubeService) => {
    service.checkVideoExist('xp6706wVdCI').toPromise().then(d => {
      expect(d.items.length).toBe(1);
    });
  })));

  it('should check video exist should fail', async(inject([ YoutubeService ], (service: YoutubeService) => {
    service.checkVideoExist('').toPromise().then(d => {
      expect(d.items.length).toBe(0);
    });
  })));
});
