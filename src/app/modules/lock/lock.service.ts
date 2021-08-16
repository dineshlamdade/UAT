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
  getAllCycleData() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'businessCycleDefinition/GETAllCycle')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
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

   //Get APIs Company Name
   getAllCompanysName() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'groupCompany/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

   //Get APIs Company Name
   getAllServicesName() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

     //Get APIs Cycle Name
     getAreawServicesName(areaName) {
      const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
      return this._HTTP.get( environment.baseUrl8084 + 'servicemaster/' + areaName)
        .pipe( map( ( res: any ) => {
          return res;
        } ) );
    }

    //Post  AreaAPI
    postAreaForm(data){
      const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
      return this._HTTP.post( environment.baseUrl8084 + 'temppayrollArea-lock', data)
        .pipe( map( ( res: any ) => {
          return res;
        } ) );
    }


    // Get Table Data

    getAllAreaTableList() {
      const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
      return this._HTTP.get( environment.baseUrl8084 + 'temppayrollArea-lock')
        .pipe( map( ( res: any ) => {
          return res;
        } ) );
    }

    //Update the lock in process

        //Post  AreaAPI
        postAreaInLock(data:any){
          // var formData: any = new FormData();

          const headers = new HttpHeaders()

          .set('content-type', 'application/json')
          .set('X-TenantId', 'PaysquareDefault');
          // formData.append('cycleLockPayrollAreaTempIds', JSON.stringify(data));

          // formData.forEach((value, key) => {
          //   console.log(key," ",value)
          // });
          return this._HTTP.put( environment.baseUrl8084 + 'payrollArea-lock',  data,)
            .pipe( map( ( res: any ) => {
              return res;
            } ) );
        }
}
