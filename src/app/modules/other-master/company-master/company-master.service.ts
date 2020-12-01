import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService {

  constructor(private _HTTP: HttpClient) { }

  getCountryCodes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8082 + '/location-information/phone-code', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }



   getAddressFromPIN(postalCode) {

    return this._HTTP.get(environment.baseUrl8082 + '/pincode-details-check/' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

    getLocationInformationOrCountryList() {

      return this._HTTP.get(environment.baseUrl8082  + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
        .pipe(map((res: any) => {
          return res;
        }))
    }


    getTypeOfEstablishment() {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment.baseUrl8083 + '/companygroupdropdown-master/TypeOfEstablishment', { 'headers': headers })
          .pipe(map((res: any) => {
            return res;
          }));
      }

      getIndustryTypeMaster(){
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment.baseUrl8083 + '/companygroupdropdown-master/industrytype', { 'headers': headers })
        .pipe(map((res: any) => {
          return res;
        }));
      }

      postCompanyMaster(data) {

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-TenantId', 'PaysquareDefault')
        return this._HTTP.post(environment.baseUrl8083 + '/compaymaster', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
          .pipe(map((res: any) => {
            return res;
          }));
      }

      getCompanyMasterDataById(id) {
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment.baseUrl8083 +'/companymaster/'+ id,{'headers':headers})
          .pipe(map((res: any) => {
            return res;
          }))
      }

      getAllCompanyMasterData() {
        const headers = new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment.baseUrl8083+ '/companymaster', { 'headers': headers })
          .pipe(map((res: any) => {
            return res;
          }));
      }


      getCurrencyList(){

        return this._HTTP.get(environment.baseUrl8082  + '/currency-information/symbol', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
        .pipe(map((res: any) => {
          return res;
        }))
      }

      getLanguagesList(){

        return this._HTTP.get(environment.baseUrl8082   + '/language-information/name', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
        .pipe(map((res: any) =>{
          return res;
        }))
      }
    }
