import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeSummaryService {

  constructor(private httpClient: HttpClient) { }


  getEmployeeSummaryInfo(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/employee-summary/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}
