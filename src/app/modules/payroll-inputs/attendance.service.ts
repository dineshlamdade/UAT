import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  url = environment.baseUrl8084;
  url1 = environment.baseUrl8086;
  url3 = environment.baseUrl8082;
  
  
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



  AttendanceInput(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput`, data); 

  }

  payrollAreaDetails(payRollAreaId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `payrollArea-details/`+ payRollAreaId); 
  }


  getAllActiveBussinessYear():Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `business-year/getAll-Active-bussiness-year`); 
  }

  businessCycleDefinition():Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `business-cycle-definition/getAllActive`); 
  }

  employeeFinDetails(employeeMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url3 + `employee-fin-details/`+ employeeMasterId); 
  }

  payrollAssigned(employeeMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url3 + `payroll-information/payrollAssigned/`+ employeeMasterId); 
  }

  PayrollAreaByPayrollAreaCode(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `payrollArea-details/PayrollAreaByPayrollAreaCode`,data); 
  }

  getCycleById(cycleID):Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `business-cycle/getCycleById/`+cycleID); 
  }

  cycleDefinitionGetAll():Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `business-cycle/cycle-definition-getAll`); 
  }

  attendanceInputAPIAllCycleRecords(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputAPIAllCycleRecords`,data); 
  }

  attendanceInputGetHistoryfuturecycle(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `AttendanceInput/attendanceInputGetHistoryfuturecycle` , data);
  }
}