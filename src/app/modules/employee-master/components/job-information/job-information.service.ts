import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { RSA_NO_PADDING } from 'node:constants';


@Injectable({
  providedIn: 'root'
})
export class JobInformationService {
  
 
  constructor(private httpClient: HttpClient) { }

  //GET summary API call
  getSummaryDetails(payrollAreaId,employeeMasterId,summaryType,jobId,jobDetail){

   let formData: any = new FormData();
    formData.append('payrollAreaId',JSON.stringify(payrollAreaId));
    formData.append('employeeMasterId',JSON.stringify(employeeMasterId));
    formData.append('summaryType',Number(summaryType));
    formData.append('jobId',jobId);
    formData.append('jobDetail',jobDetail);
    // formData.append('type','summary')
 
    return this.httpClient.post(environment.baseUrl8082 + 'employee-job-information/summary/',formData,{headers:{ 'X-TenantId': 'PaysquareDefault'}})
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
  // get job Details  by job masster type
  getJobMasterByType(type){
    return this.httpClient.get(environment.baseUrl8083+ 'job-master/'+type,{headers:{'X-Tenantid':'PaysquareDefault'}})
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  // get job Details  by job masster id
  getJobMasterByJobMasterId(jobMasterId){
    return this.httpClient.get(environment.baseUrl8083+ 'job-master-mapping/master/'+jobMasterId,{headers:{'X-Tenantid':'PaysquareDefault'}})
    .pipe(map((res:any)=>{
      return res;
    }))
  }

//check mapping available or not for copy from option

getAvailableJobMappingId(employeeMasterId){
  return this.httpClient.get(environment.baseUrl8082+'employee-job-information/isAvailable/'+employeeMasterId,{headers:{'X-TenantId':'PaysquareDefault'}})
  .pipe(map((res:any)=>{
    return res;
  }))
}

getAvailablePositionMappingId(employeeMasterId){
  return this.httpClient.get(environment.baseUrl8082+'employee-job-information/isAvailable/'+employeeMasterId,{headers:{'X-TenantId':'PaysquareDefault'}})
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
     
  //   return this.httpClient.post(environment.baseUrl8082 + '/employee-organization', organizationFormModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
  //   .pipe(map((res: any) =>{
  //     return res;
  //   }))
  // }

  return this.httpClient.post(environment.baseUrl8082 + 'employee-job-information/', organizationFormModel, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
  .pipe(map((res: any) =>{
    return res;
  }))
}

  // getOrganizationDetails(employeeMasterId,payrollAreaCode){

  //   const params = new HttpParams()
  //   .set('payrollAreaCode', payrollAreaCode);

  //   return this.httpClient.get(environment.baseUrl8082 + '/employee-organization/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
  //   .pipe(map((res: any) =>{
  //     return res;
  //   }))
  // }

  getOrganizationDetails(employeeMasterId,payrollAreaId){
let payId = Number(payrollAreaId);
const formData:FormData = new FormData();
formData.append('payrollAreaId',JSON.stringify(payId));
formData.append('employeeMasterId',JSON.stringify(employeeMasterId));
// formData.append('type','latest');
    //return this.httpClient.post(environment.baseUrl8082 + 'employee-organization/employeeMasterId/', formData,{headers:{ 'X-TenantId': 'PaysquareDefault'}})
    return this.httpClient.post(environment.baseUrl8082 + 'employee-job-information/latest/', formData,{headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  // getOrganizationDetails(employeeMasterId,payrollAreaId){

  //   const params = new HttpParams()
  //   .set('payrollAreaCode', payrollAreaId);

  //   return this.httpClient.get(environment.baseUrl8082 + '/employee-organization/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
  //   .pipe(map((res: any) =>{
  //     return res;
  //   }))
  // }
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

    const params = new HttpParams();
    params.set('payrollAreaCode', payrollAreaCode);
 

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

    return this.httpClient.get(environment.baseUrl8082 + 'minimumwages-dropdown/details' , {headers:{ 'X-TenantId': 'PaysquareDefault'}})
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
