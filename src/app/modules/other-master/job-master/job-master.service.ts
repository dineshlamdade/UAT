import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobMasterService {

  constructor(private _HTTP: HttpClient) { }

  get(path: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + path, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //komal // Get Drop Down list
  getAllJobMasters() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + 'job-master/', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  // postJobSelectedJobMaster

  postJobSelectedJobMaster(data){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.post(environment.baseUrl8083 + "job-master-value/", data , { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  // getAllOtherMasterDetails() {
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('X-TenantId', 'PaysquareDefault');

  //   return this._HTTP.get(environment.baseUrl8083 + 'all-other-masters/details', { 'headers': headers })
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }
  // get all master
  getAllOtherMasterDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8083 + 'job-master-value/', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
//Update API

  putJobMasterDetails(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.put(environment.baseUrl8083 + "job-master-value/", data, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // get all company name like infy
  getAllAtGroup() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + 'companymaster/getAllAtGroup', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
//Get All Mappings

  getAllOtheMappingDetails() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');

    return this._HTTP.get(environment.baseUrl8083 + 'job-master-mapping/', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  postMapping(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.post(environment.baseUrl8083 + "job-master-mapping/", data, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  put(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    console.log(data);
    return this._HTTP.put(environment.baseUrl8083 + "job-master-value/", data, { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  // delete(Id: number, path: string) {
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('X-TenantId', 'PaysquareDefault');
  //   return this._HTTP.delete(environment.baseUrl8083 + path + Id, { headers: headers })
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }


  // delete( id: number) {
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('X-TenantId', 'PaysquareDefault');
  //   return this._HTTP.delete(environment.baseUrl8083 + 'job-master-value/' + Id, { headers: headers })
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }

    delete( id: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + 'job-master-value/' + id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //  // delete payroll head group at global
  //  delete( id: number ) {
  //   return this._HTTP.delete( environment.baseUrl8083 + 'job-master-value/' + id )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  deleteMapping(Id: number,) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8083 + 'job-master-mapping/' + Id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

}
