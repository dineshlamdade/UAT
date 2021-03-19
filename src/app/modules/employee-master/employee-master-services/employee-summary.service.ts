import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeSummaryService {

  constructor(private httpClient: HttpClient) { }

//get employee profile summary API
  getEmployeeSummaryInfo(employeeMasterId,payrollAreaCode){
    const params = new HttpParams()
    .set('payrollAreaCode', payrollAreaCode);

    return this.httpClient.get(environment.baseUrl8082 + '/employee-summary/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'},params})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  
}
