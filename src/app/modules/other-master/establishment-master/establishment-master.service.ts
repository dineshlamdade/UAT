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
export class EstablishmentMasterService {

  constructor(private _HTTP: HttpClient) { }

  postEstablishmentMaster(data) {
    console.log(data.regionMasterId);
  return this._HTTP.post(environment.baseUrl8083 + '/establishment-master/add-establishment', data)
    .pipe(map((res: any) => {
      return res;
    }));
}
putEstablishmentMaster(data) {
  return this._HTTP.put(environment.baseUrl8083 + '/establishment-master/update', data)
    .pipe(map((res: any) => {
      return res;
    }));
}


getEstablishmentMasterDetails() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('X-TenantId', 'PaysquareDefault');


  return this._HTTP.get(environment.baseUrl8083 + '/establishment-master/details', { 'headers': headers })
    .pipe(map((res: any) => {
      return res;
    }));
}

getRegionMasterDetails() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('X-TenantId', 'PaysquareDefault');


  return this._HTTP.get(environment.baseUrl8083 + '/region-master/details', { 'headers': headers })
    .pipe(map((res: any) => {
      return res;
    }));
}
}
