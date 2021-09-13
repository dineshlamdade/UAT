import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/holdEmployee/' + cycleName)
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
  pendingLockEmptyArea1(areaName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/' + areaName)
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
    return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/' + empCode)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // getEmpCode(empCode) {
  //   const headers = new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('X-TenantId', 'PaysquareDefault');
  //   return this._HTTP.get( environment.baseUrl8084 + 'employee-lock/' + empCode)
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  getAllAreaTableList() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'temppayrollArea-lock')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //go table data / save data
  postEmpForm(data){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post( environment.baseUrl8084 + 'HoldEmployee/cycleName/', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //hold to proceed table data
  postLockCheckedEmp(data){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post( environment.baseUrl8084 + 'HoldEmployee/AddHold', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getEmpListUsingCycleName(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllCycle/' +  cycleName,)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  
  getSummaryData():Observable<any>{
    //return this.http.get<any>(this.apiUrl+ `EmployeeMaster/SummaryData`);
    return this._HTTP.get(environment.baseUrl8084 +`EmployeeMaster/getAllEmployeeSet`);
   }

//    //Area Penidng for lock API
//  pendingForLockArea() {
//   const headers = new HttpHeaders()
//   .set('content-type', 'application/json')
//   .set('X-TenantId', 'PaysquareDefault');
//   return this._HTTP.get( environment.baseUrl8084 + 'PayrollOutput/GETAllPendingCycles')
//     .pipe( map( ( res: any ) => {
//       return res;
//     } ) );
// }
//Area Penidng for lock API
pendingForLockArea() {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/')
    .pipe( map( ( res: any ) => {
      return res;
    } ) );
}



    //Post Pending for lock in Area
        //Post  AreaAPI
        postPendingAreaLock(data:any){
          const headers = new HttpHeaders()
          .set('content-type', 'application/json')
          .set('X-TenantId', 'PaysquareDefault');
          return this._HTTP.post( environment.baseUrl8084 + 'payrollArea-lock/lockDataAdd',  data,)
            .pipe( map( ( res: any ) => {
              return res;
            } ) );
        }

        

}

// pending for release api
// http://localhost:8084/hrms/v1/HoldEmployee/