import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class complianceInformationService {
  
 
  constructor(private httpClient: HttpClient) { }

  //GET input summary API call
  getSummaryDetails(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/job-information/summary/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //GET by compliance type API call to other master
  getComplianceDetails(comapnyId,establishmentId,complianceType){
    return this.httpClient.get(environment.baseUrl8083 + '/compliance-master/' + comapnyId +'/'+establishmentId+'/'+complianceType , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //GET Employee Age API call
  getEmployeeAge(employeeMasterId){
    return this.httpClient.get(environment.baseUrl8082 + '/compliance-info/employee-pfeps/' + employeeMasterId +'/age', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  //GET Employee PF gross salary API call
  getEmployeePFGrossSalary(employeeMasterId){
    return this.httpClient.get(environment.baseUrl8082 + '/compliance-info/employee-pfeps/' + employeeMasterId +'/pfgross', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //GET Input form API
  getInputDetails(employeeMasterId){
    return this.httpClient.get(environment.baseUrl8082 + '/compliance-info/employee-pfeps/' + employeeMasterId , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  //POST Input form API
  postInputDetails(inputFormModel: any) {
    return this.httpClient.post(environment.baseUrl8082 + '/compliance-info/employee-pfeps', inputFormModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //GET position dropdown values API call
  getPositionDD(){

    return this.httpClient.get(environment.baseUrl8083 + '/drop-down/details' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
   //organization details API Calls
   postOrganizationDetails(organizationFormModel: any) {
    return this.httpClient.post(environment.baseUrl8082 + '/employee-organization', organizationFormModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getOrganizationDetails(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/employee-organization/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }


  //GET Assignment form API
  getComplianceAssignmentDetails(employeeMasterId,complianceType){
    return this.httpClient.get(environment.baseUrl8082 + '/compliance-info/employee-compliance/' + employeeMasterId +'/'+complianceType, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}