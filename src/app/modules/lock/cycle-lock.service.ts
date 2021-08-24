import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleLockService {
  url = environment.baseUrl8082
  constructor(private HttpClient: HttpClient) { }

  /** Get emp data */
  getEmpData() : Observable<any> {
    // ,{headers:{'X-TenantId': 'PaysquareDefault'}}
    return this.HttpClient.get<any>(this.url + `employee-master`);
  }
}
