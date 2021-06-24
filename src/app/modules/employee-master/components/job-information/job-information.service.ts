import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobInformationService {
  
 
  constructor(private httpClient: HttpClient) { }

  //GET summary API call
  getSummaryDetails(employeeMasterId,payrollAreaCode){
    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);

    return this.httpClient.get(environment.baseUrl8082 + 'job-information/summary/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  // getOtherMasterDetails(){
  //   return this.httpClient.get(environment.baseUrl8083 + '/all-other-masters/details' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
  //   .pipe(map((res: any) =>{
  //     return res;
  //   }))
  // }


  
  getOtherMasterDetails(copmanyId){
    return this.httpClient.get(environment.baseUrl8083 + 'job-master-mapping/company/'+copmanyId ,{headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getJobMasterDetails(){
    return this.httpClient.get(environment.baseUrl8083 + 'job-master/' , {headers:{'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res:any)=>{
      return res;
    }))
  }
//check mapping available or not for copy from option

getAvailableJobMappingId(employeeMasterId){
  return this.httpClient.get(environment.baseUrl8082+'employee-organization/isAvailable/'+employeeMasterId,{headers:{'X-TenantId':'PaysquareDefault'}})
  .pipe(map((res:any)=>{
    return res;
  }))
}

getAvailablePositionMappingId(employeeMasterId){
  return this.httpClient.get(environment.baseUrl8082+'position-details/isAvailable/'+employeeMasterId,{headers:{'X-TenantId':'PaysquareDefault'}})
  .pipe(map((res:any)=>{
    return res;
  }))
}
  //Get position dropdown values API call
  getPositionDD(){

    return this.httpClient.get(environment.baseUrl8083 + 'drop-down/details' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
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

  getOrganizationDetails(employeeMasterId,payrollAreaCode){

    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);

    return this.httpClient.get(environment.baseUrl8082 + '/employee-organization/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
//Establishment service
  getEstaDetails(){

    return this.httpClient.get(environment.baseUrl8083 + 'establishment-master/details/' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //position details API Calls
  postPositionDetails(positionFormModel: any) {
    return this.httpClient.post(environment.baseUrl8082 + '/position-details', positionFormModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getPositionDetails(employeeMasterId,payrollAreaCode){

    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);

    return this.httpClient.get(environment.baseUrl8082 + 'position-details/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  // Minimum wages API Calls
  postMinimumWagesDetails(MinumumWagesDetailsModel){
    
    return this.httpClient.post(environment.baseUrl8082 + '/minimumwages-info', MinumumWagesDetailsModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getMinimumWagesDetails(employeeMasterId,payrollAreaCode){
    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);
    return this.httpClient.get(environment.baseUrl8082 + '/minimumwages-info/employeeMaster/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //Minimum wages drop down GET API call
  getMinimumDropdown(){

    return this.httpClient.get(environment.baseUrl8082 + '/minimumwages-dropdown/details' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  // Project details API Calls
  postProjectDetails(ProjectDetailsModel){

    return this.httpClient.post(environment.baseUrl8082 + '/project-details', ProjectDetailsModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getProjectDetails(employeeProjectDetailId,payrollAreaCode) {
    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);

    return this.httpClient.get(environment.baseUrl8082 + '/project-details/employeeMaster/' + employeeProjectDetailId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //get All Employees From database
  getAllEmployees(companyId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employee-master/approver/'+companyId , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  
}
