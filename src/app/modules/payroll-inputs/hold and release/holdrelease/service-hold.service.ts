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
  //hold
  getAllCycleData() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/GETAllCycle')
   // return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/hold/')
  // return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //release
  getAllCycleData1() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
   // return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/GETAllCycle')
    return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/')
   // return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/hold/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //hold
  getAllCycleNames(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  // return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/' + cycleName)
  return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/holdEmployee/' + cycleName)
  // return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/hold/' + cycleName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //release
  getAllCycleNames1(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
 
  //return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/release/' + cycleName)
  return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/forrelease/' + cycleName)
  
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
 // return this._HTTP.get( environment.baseUrl8084 + 'groupCompany/getBygroupCompanyId/' + areaName)
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
 // return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/' + areaName)
   return this._HTTP.get( environment.baseUrl8084 + 'groupCompany/getBygroupCompanyId/' + areaName)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  
  getCycleNameInEmp(cycleName) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/hold/' + cycleName)
 //return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/employeeCycleLock/' + cycleName)
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

  getEmpCodeForRelease(empCode) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
   // return this._HTTP.get( environment.baseUrl8084 + `HoldEmployee/employeeCodeForRelease/` + empCode)
    return this._HTTP.get( environment.baseUrl8084 + `HoldEmployee/employeeCodeBypayrollAreaId/` + empCode)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // getEmpSetName() {
  //   const headers = new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('X-TenantId', 'PaysquareDefault');
  //  return this._HTTP.get(environment.baseUrl8084 +`HoldEmployee/employeeSetName/`)
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

  //get emp set list
  getAllSetLists() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 +`HoldEmployee/employeeSetName/`)
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
 // return this._HTTP.put( environment.baseUrl8084 + 'HoldEmployee/ReleaseEmp', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  postLockCheckedEmp1(data){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
 // return this._HTTP.post( environment.baseUrl8084 + 'HoldEmployee/AddHold', data)
      return this._HTTP.put( environment.baseUrl8084 + 'HoldEmployee/ReleaseEmp', data)
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //release emp proceed pending
  postPendingAreaLock1(data : any){
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post( environment.baseUrl8084 + 'HoldEmployee/ReleaseEmp', data)
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
  

  // all employee set name
  getSummaryData():Observable<any>{
    //return this.http.get<any>(this.apiUrl+ `EmployeeMaster/SummaryData`);
  return this._HTTP.get(environment.baseUrl8084 +`EmployeeMaster/getAllEmployeeSet`);
 // return this._HTTP.post(environment.baseUrl8084 +`HoldEmployee/employeeSetName/`, data);
   }

   //hold employee set
   postHoldEmpSet(data : any):Observable<any>{
    //return this.http.get<any>(this.apiUrl+ `EmployeeMaster/SummaryData`);
  // return this._HTTP.get(environment.baseUrl8084 +`EmployeeMaster/getAllEmployeeSet`);
  return this._HTTP.post(environment.baseUrl8084 +`HoldEmployee/employeeSetName/`, data);
   }

   //hold employee list
   postHoldEmpList(data : any):Observable<any>{
    return this._HTTP.get(environment.baseUrl8084 +`HoldEmployee/holdEmployeeListAddHold`, data);
   }

   //release employee set
   postReleaseEmpSet(data : any):Observable<any>{

   // return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/getByEmployeeSetMasterId/', data);
    return this._HTTP.post( environment.baseUrl8084 + `HoldEmployee/holdEmployeeSet`, data);

   }

   //release employee list
   postReleaseEmpList(data : any):Observable<any>{
    return this._HTTP.get( environment.baseUrl8084 + `HoldEmployee/holdEmployeeList`, data);
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


// Penidng for release API
pendingForLockArea() {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('X-TenantId', 'PaysquareDefault');
 return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/')
// return this._HTTP.get( environment.baseUrl8084 + 'HoldEmployee/AddHold')
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
        //  return this._HTTP.post( environment.baseUrl8084 + 'payrollArea-lock/lockDataAdd', data)
          return this._HTTP.put( environment.baseUrl8084 + 'HoldEmployee/ReleaseEmp', data)
            .pipe( map( ( res: any ) => {
              return res;
            } ) );
        }

        

}

// pending for release api
// http://localhost:8084/hrms/v1/HoldEmployee/

//  http://localhost:8084/hrms/v1/businessCycleDefinition/hold/3095
// http://localhost:8084/hrms/v1/HoldEmployee/release/2792