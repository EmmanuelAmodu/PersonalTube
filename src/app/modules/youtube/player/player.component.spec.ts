import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerComponent } from './player.component';
import { YoutubeService } from '../service/youtube.service';
import { HttpClientModule } from '@angular/common/http';
import { ContextService } from '@shared/context.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  const service = {
    checkVideoExist() {
      return Observable.of({ items: [1]});
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ PlayerComponent ],
             providers   : [ {provide: YoutubeService, useValue: service}, ContextService, {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        url: [
                            {
                                path: 'player',
                            }
                        ],
                        paramMap : {
                            get(param: string): string { 
                                if (param =="videoId") return "jrch8Pf_fJU";
                                else return "";
                            }
                        }
                    },
            }}],
             imports     : [ RouterTestingModule, HttpClientModule ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should embedUrl to be truthy', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.embedUrl)
      .toBeTruthy();
  }));

  it('should videoLoader to be true', fakeAsync(() => {
    component.ngOnInit();
    tick();
      expect(component.videoLoader)
      .toBeTruthy();
  }));
});
