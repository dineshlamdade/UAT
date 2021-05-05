import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NonRecurringAmtService {

  public apiUrl = environment.baseUrl8084;
  constructor(private HttpClient: HttpClient) { }

  NonRecurringTransactionGroupSummery():Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `NonRecurringTransactionGroup`);
  }

  attendanceInputAPIRecordsUI(data,id):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `NonRecurringTransactionGroup/updateById/` + id , data);
  }
  
  NonRecurringTransactionGroup(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup`, data);
  }
  
  NonRecurringTransactionGroupUI(data):Observable<any>{
    return this.HttpClient.get<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupUI`, data);
  }
  
  NonRecurringTransactionGroupAPIEmpwise(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupAPIEmpwise`, data);
  }
  
  NonRecurringTransactionGroupAPIbyId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupAPIbyId`, data);
  }
  
  NonRecurringTransactionScheduleEMP(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionSchedule/NonRecurringTransactionScheduleEMP`, data);
  }
  
  NonRecurringTransactionScheduleupdateById(data):Observable<any>{
    return this.HttpClient.put<any>(this.apiUrl + `NonRecurringTransactionSchedule/updateById`, data);
  }
  
  NonRecurringTransactionScheduleRemarkHistorybyScheduleId(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionScheduleRemarkHistory/NonRecurringTransactionScheduleRemarkHistorybyScheduleId`, data);
  }
  
  NonRecurringTransactionGroupHeadwiseHistory(data):Observable<any>{
    return this.HttpClient.post<any>(this.apiUrl + `NonRecurringTransactionGroup/NonRecurringTransactionGroupHeadwiseHistory`, data);
  }
}
