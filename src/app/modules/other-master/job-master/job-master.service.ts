import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobMasterService {

  constructor(private _HTTP: HttpClient) { }

  get(path:string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + path, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getAllOtherMasterDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + '/all-other-masters/details', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getAllOtheMappingDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + '/all-othermasters-mapping/details', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  post(data,path) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.post(environment.baseUrl8083 + path, data, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  put(data,path) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.put(environment.baseUrl8083 + path, data, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  delete(Id: number,path:string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + path + Id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
