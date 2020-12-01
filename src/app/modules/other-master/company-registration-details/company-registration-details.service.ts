import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
const headers = new Headers({
  "Content-Type": "application/json",
  "X-TenantId": "PaysquareDefault"
});
@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationDetailsService {
  constructor(private _HTTP: HttpClient) { }

  postCompanyRegistrationDetails(data) {
    return this._HTTP.post(environment.baseUrl8083 + '/companyregistration-master', data)
      .pipe(map((res: any) => {
        return res;
      }));

  }
  putCompanyRegistrationDetails(data) {

    return this._HTTP.put(environment.baseUrl8083 + '/companyregistration-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }




  getAllActiveCompanyForRegistration() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companymaster/getAllActiveCompanysForRegistration', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }




  getCompanyRegistrationMaster() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companyregistration-master', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
