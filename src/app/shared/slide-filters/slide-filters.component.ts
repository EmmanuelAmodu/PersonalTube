import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { appConfig } from 'appConfig';
import { ICountryListModel } from '@shared/models/country-list.interface';
import { ICategoryListInterface } from '@shared/models/category-list.interface';
import { ContextService } from '@shared/context.service';

@Component({
  selector   : 'app-slide-filters',
  templateUrl: './slide-filters.component.html',
  styleUrls  : [ './slide-filters.component.scss' ]
})
export class SlideFiltersComponent implements OnInit {
  @Input() public filterSlide: any;
  public countryFormControl: FormControl = new FormControl();
  public categoryFormControl: FormControl = new FormControl();

  public countryList: ICountryListModel[] = appConfig.countryList;
  public country: any = "";
  public category: any = "";

  public categoriesList: ICategoryListInterface[] = [
    {name: 'Film & Animation', id: 1},
    {name: 'Autos & Vehicles', id: 2},
    {name: 'Music', id: 10},
    {name: 'Pets & Animals', id: 4}
  ];

  public defaultVideosOnPage: number = appConfig.maxVideosToLoad;
  public count: number;

  constructor(private appContext: ContextService,
              private router: Router) {
  }

  public ngOnInit() {
    this.countryFormControl.valueChanges.subscribe(country => this.loadCountryTrend(country));
    this.categoryFormControl.valueChanges.subscribe(catg => this.loadCategoryTrend(catg));
  }

  public onChangeVideosPerPage(count: number) {
      this.count = count;
    this.router.navigate(['/youtube'], { queryParams:  { count: this.count, country: this.country, category: this.category } });
  }

  public loadCategoryTrend(category: number) {
      this.category = category;
    this.router.navigate(['/youtube'], { queryParams: { count: this.count, country: this.country, category: this.category } });
  }

  public loadCountryTrend(val) {
    if(this.country !== val) {
      this.country = val;
      this.router.navigate(['/youtube'], { queryParams: { count: this.count, country: this.country, category: this.category } });
    }
  }
}
