import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlexiInputService {

  constructor(private _HTTP: HttpClient, private http: HttpClient) { }

 //Get APIs Lock Area
 getAllSectionTableList() {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get( environment.baseUrl8084 + 'FlexiSectionMaster')
    .pipe( map( ( res: any ) => {
      return res;
    } ) );
}


}
