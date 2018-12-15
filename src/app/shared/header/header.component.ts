import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ContextService } from '../context.service';

@Component({
  selector   : 'app-page-header',
  templateUrl: './header.component.html',
  styleUrls  : [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
  @Input() public filterSlide: any;
  public showFilter: boolean = true;
  public title$: Subject<string> = this.appContext.moduleTitle;

  constructor(private appContext: ContextService) {}

  public ngOnInit(): void {
    this.appContext.hideFilter.subscribe(hide => this.showFilter = !hide);
  }
}
