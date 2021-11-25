import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PayrollInputsService {
public apiUrl = environment.baseUrl8084;
public apiUrlEmployeeDetails = environment.baseUrl8082;
public employeeList = [];
constructor(private http: HttpClient) { }

getFinancialMasterSummary() {

  return this.http.get(this.apiUrl + 'NonRecurringTransactionGroup')
    .pipe(map((res: any) => {
      return res;
    }));
  }

getFinancialMasterSchedule() {

  let params = new FormData();
  params.append('nonRecurringTransactionGroupId', '3');
  return this.http.post(this.apiUrl + 'NonRecurringTransactionSchedule/NonRecurringTransactionScheduleEMP', params)
    .pipe(map((res: any) => {
      return res;
    }));
  }

getFinancialMasterTransaction() {
  let params = new FormData();
  params.append('nonRecurringTransactionScheduleId', '11');
  params.append('nonRecurringTransactionGroupId', '3');
  console.log(params);
  return this.http.post(this.apiUrl + 'NonRecurringTransactionScheduleRemarkHistory/NonRecurringTransactionScheduleRemarkHistorybyScheduleId', params)
    .pipe(map((res: any) => {
      return res;
    }));
  }

postLeavePage(data) {
  return this.http.post(this.apiUrl + 'leave-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

public getAllEmployeeDetails() {
  return this.http.get(this.apiUrlEmployeeDetails + '/employee-master')
    .pipe(map((res: any) => {
      return res;
    }));
}

getPayrollWiseEmployeeList(payrollArea):Observable<any>{
  // https://dev.deliziahr.com:8082/hrms/v1/payroll-information/payrollAreaWiseEmployee/%7bPAyrollAreaId%7d
  return this.http.get<any>(this.apiUrlEmployeeDetails + 'payroll-information/payrollAreaWiseEmployee/'+payrollArea);
}

getEmployeeListArray() {
  return this.employeeList;
}

setEmployeeListArray(emp) {
  this.employeeList = emp;
}

getEmployeeList():Observable<any>{
  // https://dev.deliziahr.com:8082/hrms/v1/employee-master/employee-info
  return this.http.get<any>(this.apiUrlEmployeeDetails + 'employee-master/employee-info');
}

getPayrollList():Observable<any>{
  // return this.http.get<any>(this.apiUrl + 'payrollArea-details');
  return this.http.get<any>('https://dev.deliziahr.com:8084/hrms/v1/payrollArea-details');
}


}
