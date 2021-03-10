import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PreviousEmploymentInformationService {

  constructor(private httpClient: HttpClient) { }

  postPreviousEmpInfoForm(previousEmploymentInformationArray){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + '/employee-previous-employment', previousEmploymentInformationArray, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  putPreviousEmpInfoForm(previousEmploymentInformationArray){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.put(environment.baseUrl8082 + '/employee-previous-employment', previousEmploymentInformationArray, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getPreviousEmpInformation(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/employee-previous-employment/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getCurrencyList(){

    return this.httpClient.get(environment.baseUrl8082 + '/currency-information/symbol', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  deleteGridItem(deletePreviousEmploymentId){
    
    return this.httpClient.put(environment.baseUrl8082 + '/employee-previous-employment/' + deletePreviousEmploymentId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}
