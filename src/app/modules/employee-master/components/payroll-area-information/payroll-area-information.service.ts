import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PayrollAreaInformationService {

  constructor(private httpClient: HttpClient) { }

  postPayrollAreaInfoForm(PayrollAreaSummaryGridData){

    return this.httpClient.post(environment.baseUrl8082 +
       '/payroll-information', PayrollAreaSummaryGridData, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  putPayrollAreaInfoForm(PayrollAreaSummaryGridData){

    return this.httpClient.put(environment.baseUrl8082 +
      '/payroll-information/update', PayrollAreaSummaryGridData, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getPayrollAreaInformation(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 +
       '/payroll-information/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getDistinctPayrollAreaInformation(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 +
       '/payroll-information/distinct/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  deletePayrollAreaGridItem(deletePayrollId){

    return this.httpClient.delete(environment.baseUrl8082 +
      '/payroll-information/' + deletePayrollId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }


  getEducationList(){

    return this.httpClient.get(environment.baseUrl8082 + '/education/coursename', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getBankAccountDetails(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 +
      '/employee-bank-info/employeeMasterId/'+employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getPayrollAreaDetails(){

    return this.httpClient.get(environment.baseUrl8084 + 'payrollArea-details', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}
