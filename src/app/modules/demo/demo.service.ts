import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public apiUrl = environment.baseUrl8091;
  public apiUrl1 = environment.baseUrl8083;
  public apiUrl2 = environment.baseUrl8088;
  public apiUrl3 = environment.baseUrl8082;

  constructor(private http : HttpClient ) { }

  getEmpMasterDetails(id): Observable<any>
{
  return this.http.get<any>(this.apiUrl3 + 'employee-fin-details/' +id);
}

public getBankMasterDetails(){
  return this.http.get<any>(this.apiUrl3 + 'employee-bank-info/employeeMasterId/2251');
}
}
