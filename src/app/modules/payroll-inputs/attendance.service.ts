import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  url = environment.baseUrl8084;

  constructor(private HttpClient: HttpClient) { }

  /** Get All Summary data */
  getAttendanceSummaryData() : Observable<any> {
    // ,{headers:{'X-TenantId': 'PaysquareDefault'}}
    return this.HttpClient.get<any>(this.url + `AttendanceSummary/AttendanceSummaryRecordsUI`);
  }

  attendanceInputAPIRecordsUI(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputAPIRecordsUI` , data);
  }

  AttendanceSummaryDatewiseRecordsUI(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceSummary/AttendanceSummaryDatewiseRecordsUI` , data);
  }

  attendanceInputGetAPIFuturecycle(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputGetAPIFuturecycle` , data);
  }

  attendanceInputGetTotalAPIRecordsUI(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputGetTotalAPIRecordsUI` , data);
  }

  attendanceInputGetAPIPreviouscycle(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputGetAPIPreviouscycle` , data);
  }

  attendanceInputGetAPIFuturecycles(data):Observable<any>{
    return this.HttpClient.get<any>(this.url + `AttendanceInput/attendanceInputGetAPIFuturecycle`, data); 
  }

  AttendanceInput(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput`, data); 

  }

  payrollAreaDetails(payRollAreaId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `payrollArea-details/`+ payRollAreaId); 
  }
}