import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  public apiUrl3 = environment.baseUrl8086;
  public apistate=environment.baseUrl8082;
//-http://localhost:8083/hrms/v1/location-master/
public apiUrlcity = environment.baseUrl8083;
  constructor(private _HTTP: HttpClient) { 
    
  }

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

  //get all frequency lists
  // getActiveFrequency() {

  //   return this._HTTP.get( environment.baseUrl8086 + 'frequency-master/getAllActive' )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }
  //https://dev.deliziahr.com:8086/hrms/v1/frequency-master/getAllActive
// /  getStatutoryFreq(){
// return this._HTTP.get(environment.baseUrl8086 + 'frequency-master/getAllActive' )

// .pipe(map((res:any)=>{
//   return res;
// }));
//   }

//-http://localhost:8083/hrms/v1/location-master/
  public getStatutoryFreq(): Observable<any>{
    return this._HTTP.get<any>(this.apiUrl3 + 'frequency-master/getAllActive');
  }

  public getState():Observable<any>{
    return this._HTTP.get<any>(this.apistate + '/location-information/state/');
  }
//State with City Api 
  public getCitywithState():Observable<any>{
    return this._HTTP.get<any>(environment.baseUrl8083 + 'location-master/105');
  }

}
