import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from './../../../../environments/environment';
const headers = new Headers({
  "Content-Type": "application/json",
  "X-TenantId": "PaysquareDefault"
});
@Injectable({
  providedIn: 'root'
})
export class CompanyGroupMasterService {
  constructor(private _HTTP: HttpClient) { }

  getCompanyGroupMaster() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companygroup-master', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCompanygroupdropdownMaster() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companygroupdropdown-master', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCompanygroupdropdownScaleMaster() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companygroupdropdown-master/scale', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCompanygroupdropdownReasonForExitMaster() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/companygroupdropdown-master/ReasonForExit', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postCompanyGroupMaster(data) {
    return this._HTTP.post(environment.baseUrl8083 + '/companygroup-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  putCompanyGroupMaster(data) {

    return this._HTTP.put(environment.baseUrl8083 + '/companygroup-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }



}
