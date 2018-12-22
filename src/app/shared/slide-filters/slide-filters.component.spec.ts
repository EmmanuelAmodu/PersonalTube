import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import {
  MatAutocompleteModule, MatIconModule, MatInputModule, MatSidenavModule,
  MatSliderModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SlideFiltersComponent } from './slide-filters.component';
import { ContextService } from '../context.service';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let component: SlideFiltersComponent;
  let fixture: ComponentFixture<SlideFiltersComponent>;
  let location: ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ SlideFiltersComponent ],
             providers   : [  ],
             imports     : [
               BrowserAnimationsModule,
               FormsModule,
               ReactiveFormsModule,
               RouterTestingModule,
               MatAutocompleteModule,
               MatIconModule,
               MatInputModule,
               MatSidenavModule,
               MatSliderModule
             ]
           })
           .compileComponents();
    location = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should set Page videos count when videosCountPerPage value change', () => {
    component.videosCountPerPage.setValue(50);
    expect(component.count)
      .toBe(50);
  });

  it('should set Page category count when categoryFormControl value change', () => {
    component.categoryFormControl.setValue(2);
    expect(component.category)
      .toBe(2);
  });

  it('should set Page category count when categoryFormControl value change', () => {
    component.categoryFormControl.setValue(2);
    expect(component.category)
      .toBe(2);
  });
});
