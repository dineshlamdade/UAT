import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceHoldService {

  constructor(private _HTTP: HttpClient) { }
  getAllCycleData() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/GETAllCycle')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllCycleNames(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/' + cycleName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

   //Get APIs Cycle Name
   getAllCycleNamesA() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  pendingLockEmptyArea(areaName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'PayrollOutput/GETAllPendingCycles/' + areaName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllCompanysName() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'groupCompany/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getAllServicesName() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getAreawServicesName(areaName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/' + areaName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getCycleNameInEmp(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/employeeCycleLock/' + cycleName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getEmpCode(empCode) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'employee-lock/' + empCode)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllAreaTableList() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'temppayrollArea-lock')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  postEmpForm(data){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post( environment.baseUrl8084 + 'employee-lock/cycleName/', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  postLockCheckedEmp(data){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post( environment.baseUrl8084 + 'employee-lock', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  

}
