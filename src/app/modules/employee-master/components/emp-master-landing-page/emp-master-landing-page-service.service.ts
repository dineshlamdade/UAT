import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpMasterLandingPageServiceService {
  sharedData: any;

  constructor(private httpClient : HttpClient) { }

  getEmployeeCountInformation(groupCompanyId){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.get(environment.baseUrl8082 + 'EmployeeMasterLandingPage/getEmployeeDetails/'+groupCompanyId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  // getPaymentTrackingData(){
  //   // const body = { EmployeePersonalRequestDTO: personalInformationModel }

  //   return this.httpClient.get(environment.baseUrl8092 + 'Payment-Tracking/getSummary', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
  //   .pipe(map((res: any) =>{
  //     return res;
  //   }))
  // }


  getEmployeeSummaryInformation(body){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + 'EmployeeMasterLandingPage/getAllDetails',body ,{headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
 
  getEmployeeData(data){

    this.sharedData= data;
  }
  getSharedEmployeeData(){
  return   this.sharedData;
  }
  deleteSharedEmployeeData(){
    this.sharedData=null;
  }

  
  
}
