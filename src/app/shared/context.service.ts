import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContextService {
  public moduleTitle: Subject<string> = new Subject<string>();
  public hideFilter: Subject<boolean> = new Subject<boolean>();
  public pageToken: Subject<string> = new Subject<string>();
  public infPageToken: Subject<string> = new Subject<string>();
}



