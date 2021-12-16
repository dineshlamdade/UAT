import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialMasterService {

  apiUrl = environment.baseUrl8084;
  apiUrlBusinessCycle = environment.baseUrl8086;
  apiUrlEmployeeDetails = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }



  getAllRecords(empId, payroll) {
    return this._HTTP.get(this.apiUrl + 'financial-master/financialMasterAPIRecordsUI?employeeMasterId=' + empId + '&payrollArea=' + payroll)
      .pipe(map((res: any) => {
        return res;
      }
      ));
  }

  postfinancialMaster(data) {

    return this._HTTP.post(this.apiUrl + 'financial-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public getEmployeeDetails(data): Observable<any> {
    return this._HTTP.get(this.apiUrlEmployeeDetails + '/employee-fin-details/' + data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public getCurrencyDetails(data): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'payrollArea-details/' + data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public getFrequencyMaster(id) {
    // return this._HTTP.get(this.apiUrlBusinessCycle + 'frequency-master/get/' + id)
    //   .pipe(map((res: any) => {
    //     return res;
    //   }));
  }


  public getfinancialmasterHeadHistory(data): Observable<any> {
    // let params = new HttpParams();
    // params = params.append('employeeMasterId', empId);
    // params = params.append('HeadId', id);
    // params = params.append('payrollArea', 'PA-Staff');
    return this._HTTP.post<any>(this.apiUrl + 'financial-master/financialMasterHistoryAPIRecordsUI', data)
  }



  /** Get all summary data */
  getAllSummarydata(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'financial-master/financialMasterAllRecordRecords')
  }

}
