import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
const headers = new Headers({
  "Content-Type": "application/json",
  "X-TenantId": "PaysquareDefault"
});

@Injectable({
  providedIn: 'root'
})
export class ComplianceHeadService {

  constructor(private _HTTP: HttpClient) { }

  postComplianceHead(data) {
    return this._HTTP.post(environment.baseUrl8083 + 'compliance-head/add-head', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  putComplianceHead(data) {
    return this._HTTP.put(environment.baseUrl8083 + 'compliance-head/update-head', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }



  getLocationInformationOrCountryList() {
    return this._HTTP.get(environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getComplianceHeadDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + 'compliance-head/details', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteComplianceHead(Id: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.put(environment.baseUrl8083 + 'compliance-head/softdelete/' + Id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
