import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NonRecurringQtyService {

  public apiUrl = environment.baseUrl8084;

  constructor(private HttpClient: HttpClient) { }

  /** All Summary Data */
  NonRecurringnonsalary():Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `nonsalary`);
  }

  /** Save master data */
  nonsalary(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `nonsalary`,data);
  }

  /** Update master data */
  updatenonsalary(data):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `nonsalary`,data);
  }



  /********************************* NR QTY Transaction  ***************************/

  /** Get All Summary */
  NonRecurringTransactionGroupSummery():Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `NonSalaryTransactionGroup`);
  }

  /** Transaction History - summary page */
  NonSalaryTransactionGroupHistoryAPI(data,nonSalaryTransactionGroupId):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionGroup/NonSalaryTransactionGroupHistoryAPI_ID`, data);
  }

  /** Schedule History - summary page */
  NonSalaryTransactionScheduleEMP(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionSchedule/NonSalaryTransactionScheduleEMP`, data);  
  }
  
  /** Head wise history - summary page*/
  NonSalaryTransactionGroupHeadwiseHistory(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionGroup/NonSalaryTransactionGroupHeadwiseHistory`, data);  

  }

  /** All schedule data  - schedule tab*/
  getAllScheduleData():Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `NonSalaryTransactionSchedule`);
  }

  /** Get Schedule popup data - schedule tab */
  NonSalaryTransactionScheduleRemarkHistorybyScheduleId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionScheduleRemarkHistory/NonSalaryTransactionScheduleRemarkHistorybyScheduleId`,data);
  }

  /** Update schedule - schedule tab */
  NonRecurringSalaryScheduleupdateById(data):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `NonSalaryTransactionSchedule/updateById`,data);
  }

  /** Get Salary transaction data  - Transaction tab */
  NonRecurringTransactionGroupAPIEmpwise(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionGroup/NonSalaryTransactionGroupAPIAllEmp`,data);   
  }

  /** Save salary transaction - Transaction tab */
  NonSalaryTransactionGroup(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonSalaryTransactionGroup`,data);   
  }
  
}