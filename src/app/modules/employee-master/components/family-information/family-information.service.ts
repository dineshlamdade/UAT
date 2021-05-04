import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FamilyInformationService {

  constructor(private httpClient: HttpClient) { }

  // Family Details

  postFamilyDetailsInfoForm(ReJoiningForm){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + '/family-details', ReJoiningForm, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }



  // Bank Details 
  postBankDetailsInfoForm(ReJoiningForm){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + '/family-bank-detail', ReJoiningForm, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getBankDetailsInfo(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-bank-detail/all/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getCopyFromAddress(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-details/address/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getFamilyGridSummary(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-details/summary/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getFamilyDetailsInfo(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-details/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getFamilyMemberInfo(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-nomination/familyMember/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  // Nomination Details

  postNominationDetails(dataSource){

    return this.httpClient.post(environment.baseUrl8082 + '/family-nomination', dataSource, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getESICGridInfo(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-nomination/esic/all/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getAllNominations(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/family-nomination/all/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getAllESICLocation(){

    return this.httpClient.get(environment.baseUrl8082 + '/esic-location', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  getParentInfo(employeeMasterId){
    return this.httpClient.get(environment.baseUrl8082+'employee-master/parentInfo/'+employeeMasterId,{headers:{'X-TenantId':'PaysquareDefault'}})
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
