import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LockService {


  constructor(private _HTTP: HttpClient, private http: HttpClient) { }

  //Get APIs Lock Area
  getAllCycleData() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'businessCycleDefinition/GETAllCycle')
      .pipe(map((res: any) => {
        return res;
      }));
  }


  // // this is getting value from global
  // getByHeadMasterByNature( earningordeduction: any ) {
  //   return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/globalHeadType/' + earningordeduction )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  //Get APIs Cycle Name
  getAllCycleNames(cycleName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'businessCycleDefinition/' + cycleName)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get APIs Cycle Name
  getAllCycleNamesA() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'businessCycleDefinition/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get APIs Company Name
  getAllCompanysName() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'groupCompany/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get APIs Company Name
  getAllServicesName() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'servicemaster/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get APIs Cycle Name
  //  getAreawServicesName(areaName) {
  //   const headers = new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('X-TenantId', 'PaysquareDefault');
  //   return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/' + areaName)
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  getAreawServicesName(companyId, businessCycleId, businessCycleDefinationId) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'payrollArea-lock/getAllareaByCompanyName/' + companyId + '/' + businessCycleId + '/' + businessCycleDefinationId)
      .pipe(map((res: any) => {
        return res;
      }));
  }



  //Post  AreaAPI
  postAreaForm(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'payrollArea-lock/getAllSelectedcycles/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  postAreaForm1(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'payrollArea-lock/getAllAreaSetData/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  // Get Table Data

  getAllAreaTableList() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'temppayrollArea-lock')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Update the lock in process

  //Post  AreaAPI
  postAreaInLock(data: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'payrollArea-lock', data,)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Post Pending for lock in Area
  //Post  AreaAPI
  postPendingAreaLock(data: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'payrollArea-lock/lockDataAdd', data,)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // EMP COde
  //Get APIs Cycle Name
  getEmpCode(empCode) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'employee-lock/' + empCode)
      .pipe(map((res: any) => {
        return res;
      }));
  }




  //Get APIs
  getAreaInEmp(payCode) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + ' servicemaster/' + payCode)
      .pipe(map((res: any) => {
        return res;
      }));
  }



  //Get APIs Period Name
  getCycleNameInEmp(cycleName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'businessCycleDefinition/employeeCycleLock/' + cycleName)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Save Emp form

  postEmpForm(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'employee-lock/cycleName/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postLockCheckedEmp(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'employee-lock', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }



  //As & When API

  //Company name
  getCompnays() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'groupCompany/')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  //Get type
  getAsAndWhenType() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // get Cycle name
  getCycleName(cycleName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllCycle/' + cycleName)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Post As and when
  postAsAndWhen(data: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.post(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock', data,)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //get As & when Summary table list

  getCyclesToLocktable() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllCycle/Supplementry/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Pending for lock in As and When

  pendingForLockAsWhen() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllPendingCycle')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Call on Go
  // cycleLockAs&WhenAndSupp-lock/GETAllCycle/Supplementry/5


  getGoCycleName(type, cycleName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllCycle/' + type + '/' + cycleName)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Area Penidng for lock API
  pendingForLockArea() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'PayrollOutput/GETAllPendingCycles')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Area Penidng for lock API Empty
  pendingLockEmptyArea(areaName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'PayrollOutput/GETAllPendingCycles/' + areaName)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Emp Get Service
  getEmpListUsingCycleName(cycleName) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/GETAllCycle/' + cycleName,)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  /**get Area Summary data */
  getAreaSetData() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'Areamaster/getAllAreaMasters')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Emp set

  getEmpSet() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'EmployeeMaster/getAllEmployeeSet')
      .pipe(map((res: any) => {
        return res;
      }));
  }


  // getImages() {
  //   return this._HTTP.get<any>('assets/showcase/data/photos.json')
  //     .toPromise()
  //     .then(res => <Image[]>res.data)
  //     .then(data => { return data; });
  //   }

  //Summary Tab All Get API

  getAreaSummary() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'payrollArea-lock/getAllCycleLockSummary/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getEmployeeSummary() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'employee-lock/getAllEmployeeLockSummary/')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getAsAndWhenSummary() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'cycleLockAs&WhenAndSupp-lock/getAllAsAndWhenCycleLockSummary/')
      .pipe(map((res: any) => {
        return res;
      }));
  }



}



