import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerComponent } from './player.component';
import { YoutubeService } from '../service/youtube.service';
import { HttpClientModule } from '@angular/common/http';
import { ContextService } from '@shared/context.service';
import { ActivatedRoute } from '@angular/router';


describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ PlayerComponent ],
             providers   : [ YoutubeService, ContextService, {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        url: [
                            {
                                path: 'player',
                            }
                        ],
                        paramMap : {
                            get(param: string): string {return "jrch8Pf_fJU"}
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

});
