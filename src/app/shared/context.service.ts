import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContextService {
  public moduleTitle: Subject<string> = new Subject<string>();
  public videosCount: Subject<number> = new Subject<number>();
  public currentPage: Subject<number> = new Subject<number>();
  public pageToken: Subject<string> = new Subject<string>();
}

