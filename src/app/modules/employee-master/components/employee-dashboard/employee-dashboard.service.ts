import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {

  constructor(private httpClient : HttpClient) { }

  getThoughtOfTheDay(){
    return this.httpClient.get(environment.baseUrl8082 + 'thought-ofthe-day/message', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getNewJoineeData(){
    return this.httpClient.get(environment.baseUrl8082 + 'employee-offical/new-joinee', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getWorkAnniversaryData(){
    return this.httpClient.get(environment.baseUrl8082 + 'employee-offical/work-anniversary', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getBirthdayData(){
    return this.httpClient.get(environment.baseUrl8082 + 'employee-offical/birthday', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

}
