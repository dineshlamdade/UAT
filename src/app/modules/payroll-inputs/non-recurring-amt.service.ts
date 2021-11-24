import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NonRecurringAmtService {

  public apiUrl = environment.baseUrl8084;
  public apiUrl1 = environment.baseUrl8082;
  
  constructor(private HttpClient: HttpClient) { }

  /** All Summary Data */
  NonRecurringTransactionGroupSummery():Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `NonRecurringTransactionGroup`);
  }

  getAllScheduleData(){
    return this.HttpClient.get<any>(this.apiUrl + `NonRecurringTransactionSchedule`);
  }

  /**  Popup summary - Schedule details */
  NonRecurringTransactionScheduleEMP(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionSchedule/NonRecurringTransactionScheduleEMP`, data);
  }
  
  /**  Popup summary - Schedule history */
  NonRecurringTransactionScheduleRemarkHistorybyScheduleId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionScheduleRemarkHistory/NonRecurringTransactionScheduleRemarkHistorybyScheduleId`, data);
  }

  /** Popup Summary - On Click History Popup */
  NonRecurringTransactionGroupHeadwiseHistory(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupHeadwiseHistory`, data);
  }

  /** Employee Data get By Id */
  employeeFinDetails(employeeMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl1 + `employee-fin-details/`+ employeeMasterId); 
  }

  /** Employee tranasaction data summary by Employee  */
  NonRecurringTransactionGroupAPIEmpwise(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupAPIEmpwise`, data);
  }

  NonRecurringTransactionGroupUI(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupUI`, data);
  }
  
  NonRecurringTransactionScheduleupdateById(data):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `NonRecurringTransactionSchedule/updateById`, data);
  }

  /** Update Transaction */
  attendanceInputAPIRecordsUI(data,id):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `NonRecurringTransactionGroup/updateById/`  , data);
  }
  
  
  NonRecurringTransactionGroup(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup`, data);
  }
  
  NonRecurringTransactionGroupAPIbyId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupAPIbyId`, data);
  }
  
  NonRecurringTransactionGroupHistoryAPIbyId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupHistoryAPIbyId`, data);
  }
  
  PayrollAreaByPayrollAreaCode(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `payrollArea-details/PayrollAreaByPayrollAreaCode`, data);
  }
  
  payrollAreaDetails(headGroupDefinitionId):Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `payrollArea-details/`+headGroupDefinitionId);
 
  }

  getEmployeeWisePayrollList(employeeMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl1 + `payroll-information/payrollAssigned/`+employeeMasterId);
  }

  NonRecurringTransactionGroupGetSDMValue(data){
    return this.HttpClient.post(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupGetSDMValue` , data)
  }

  NonRecurringTransactionGrouprangeValidation(data){
    return this.HttpClient.post(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGrouprangeValidation` , data)
  }

  nonRecurringTransactionGroupDeviation_RepeateBynonTransactionId(nonRecurringTransactionGroupId){
    return this.HttpClient.get(this.apiUrl + `NonRecurringTransactionGroup/nonRecurringTransactionGroupDeviation_RepeateBynonTransactionId?nonRecurringTransactionGroupId=`+nonRecurringTransactionGroupId)
  }
}
