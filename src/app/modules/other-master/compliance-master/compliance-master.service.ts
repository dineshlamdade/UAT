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
export class ComplianceMasterService {


  constructor(private _HTTP: HttpClient) { }

    postComplianceMaster(data) {
    return this._HTTP.post(environment.baseUrl8083 + '/compliance-master/add-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  putComplianceMaster(data) {
    return this._HTTP.put(environment.baseUrl8083 + '/compliance-master/update-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteComplianceMasterDetail(Id:number) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + '/compliance-master/detail/'+Id, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteComplianceMaster(Id:number) {
    console.log(Id);
    console.log(Id);
    console.log(Id);
    console.log(Id);
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + '/compliance-master/'+Id, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  putComplianceMasterUpdateDetails(data) {
    return this._HTTP.put(environment.baseUrl8083 + '/compliance-master/update-details', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postComplianceApplicability(data) {
    return this._HTTP.post(environment.baseUrl8083 + '/compliance-applicability/add-applicability', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


    getComplianceApplicabilityDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
     return this._HTTP.get(environment.baseUrl8083 + '/compliance-applicability/details', { 'headers': headers })
   // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/compliance-applicability/details',{'headers': headers})
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getListOfCityFromTheState(stateName: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
  //  return this._HTTP.get(environment.baseUrl8082 + '/location-information/city/+ stateName,{ headers: { 'X-TenantId': 'PaysquareGlobal' } })

     return this._HTTP.get(environment.baseUrl8082+'/location-information/city/'+ stateName, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getComplianceMasterDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/compliance-master/details', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getAllOtherMasterDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + '/all-other-masters/details', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getAllOtherMastersMappingDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
     return this._HTTP.get(environment.baseUrl8083 + '/all-othermasters-mapping/details', { 'headers': headers })
    // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/all-othermasters-mapping/details',{'headers': headers})
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStates(){

    return this._HTTP.get(environment.baseUrl8082 + '/location-information/state/', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }



}
