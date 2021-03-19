import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
const headers1 = new HttpHeaders({
  'Content-Type': "application/json",
  'X-TenantId': 'PaysquareDefault',
  'Access-Control-Allow-Origin': '*'
});

@Injectable({
  providedIn: 'root'
})
export class CompanyGroupMasterService {
  constructor(private _HTTP: HttpClient) { }

  getCompanyGroupMaster() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroup-master', { headers: headers1 })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getCompanyGroupMasterActive() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroup-master', { 'headers': headers1 })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  getCompanygroupdropdownMaster() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroupdropdown-master/getAllActive', { 'headers': headers1 })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getCompanyGroupMasterGetAllActiveAndInActive() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroup-master', { 'headers': headers1 })
      .pipe(map((res: any) => {
        return res;
      }));

  }

  getCompanygroupdropdownScaleMaster() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroupdropdown-master/scale', { 'headers': headers1 })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCompanygroupdropdownReasonForExitMaster() {
    return this._HTTP.get(environment.baseUrl8083 + 'companygroupdropdown-master/ReasonForExit', { 'headers': headers1 })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postCompanyGroupMaster(data) {
    return this._HTTP.post(environment.baseUrl8083 + 'companygroup-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  putCompanyGroupMaster(data) {
    return this._HTTP.put(environment.baseUrl8083 + 'companygroup-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }



}
