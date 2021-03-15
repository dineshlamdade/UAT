import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
const headers = new Headers({
  'Content-Type': 'application/json',
  'X-TenantId': 'PaysquareDefault',
});
@Injectable({
  providedIn: 'root',
})
export class PayrollService {

  public apiUrl = environment.baseUrl8084;
  public apiUrlBusinessCycle = environment.baseUrl8086;
  public apiUrlEmployeeDetails = environment.baseUrl8082;
  // public apiUrl = 'http://localhost:8088/hrms/v1/';

constructor(private _HTTP: HttpClient) { }

public getPayrollAreaDetails(): Observable<any>  {
  return this._HTTP.get(this.apiUrl + 'payrollArea-details')
    .pipe(retry(3));
  }

public getBussinessCycleDetails(): Observable<any>  {
    return this._HTTP.get(this.apiUrlBusinessCycle + 'business-cycle')
      .pipe(map((res: any) => {
        return res;
      }));
    }

public getEmployeeDetails(data): Observable<any>  {
  return this._HTTP.get(this.apiUrlEmployeeDetails + '/employee-fin-details/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
}

public getAllEmployeeDetails(): Observable<any>  {
  return this._HTTP.get(this.apiUrlEmployeeDetails + '/employee-master')
    .pipe(map((res: any) => {
      return res;
    }));
}

public getCurrencyDetails(data): Observable<any>  {
  return this._HTTP.get(this.apiUrl + 'payrollArea-details/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
}

public getFrequencyMaster(id): Observable<any>  {
  return this._HTTP.get(this.apiUrlBusinessCycle + 'frequency-master/get/' + id)
    .pipe(map((res: any) => {
      return res;
    }));
}

public getAllRecords(): Observable<any>  {
  return this._HTTP.get(this.apiUrl + 'financial-master/financialMasterAPIRecordsUI?employeeMasterId=1&payrollArea=PA-Staff')
  .pipe(map((res: any) => {
    return res;
  },
  ));
}

public getfinancialmasterHeadHistory(empId, id): Observable<any>   {
  let params = new HttpParams();
  params = params.append('employeeMasterId', empId);
  params = params.append('HeadId', id);
  params = params.append('payrollArea', 'PA-Staff');
  return this._HTTP.get(this.apiUrl + 'financial-master/financialMasterHistoryAPIRecordsUI', {params})
  .pipe(map((res: any) => {
    return res;
  },
  ));
}

public postfinancialMaster(data): Observable<any>   {

  return this._HTTP.post(this.apiUrl + 'financial-master', data)
  .pipe(map((res: any) => {
    return res;
  }));
}

}
