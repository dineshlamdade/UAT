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
export class BankMasterAtCompanyService {
  constructor(private _HTTP: HttpClient) { }

  postBankMaster(data) {
    return this._HTTP.post(environment.baseUrl8083 + 'company-bankmaster/add-bank', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  postBankMasterMapping(data) {
    return this._HTTP.post(environment.baseUrl8083 + 'company-bankmaster-mapping/map-bankmaster', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getBankMasterDetails() {
    return this._HTTP.get(environment.baseUrl8083 + 'company-bankmaster/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  putBankMasterMapping(data) {
    return this._HTTP.put(environment.baseUrl8083 + 'company-bankmaster-mapping/update', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getDataFromIFSC(bankIFSC) {

    return this._HTTP.get(environment.baseUrl8082 + 'bank-master/data/' + bankIFSC, { headers: { 'X-TenantId': 'PaysquareDefault' } })

      .pipe(map((res: any) => {
        return res;
      }))
  }
  getCompanyBanMasterMappingDetails() {
    return this._HTTP.get(environment.baseUrl8083 + 'company-bankmaster-mapping/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }));
  }

//

  deleteCompanyBankMasterMapping(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + 'company-bankmaster-mapping/' + data, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getGroupCompanyDetails() {
    return this._HTTP.get(environment.baseUrl8083 + 'group-company/details', { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }));

  }




}
