import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LockService {


  constructor(private _HTTP: HttpClient) { }

  //Get APIs Lock Area

  get(path: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + path, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }



}
