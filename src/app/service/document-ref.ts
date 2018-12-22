import { Injectable } from '@angular/core';

function _document() : any {
   return document;
}

@Injectable()
export class DocumentRef {
   get nativeDocument() : any {
      return _document();
   }
}