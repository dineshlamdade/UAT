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
}
