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
});
