import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatuatoryComplianceService {

  constructor(private _HTTP: HttpClient) { }

  getLocationInformationOrCountryList() {

    return this._HTTP.get(environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCompliaceInstitutionMasterDetails() {

    return this._HTTP.get(environment.baseUrl8083 + '/compliance-institution-master/details', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postComplianceInstituionMaster(data) {
    return this._HTTP.post(environment.baseUrl8083 + '/compliance-institution-master/add-institution', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  putComplianceInstituionMaster(data) {

    return this._HTTP.put(environment.baseUrl8083 + '/compliance-institution-master/update', data)
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


}
