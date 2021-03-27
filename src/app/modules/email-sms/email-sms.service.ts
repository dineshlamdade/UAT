import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailSmsService {

  url = environment.baseUrl8081;

  moduleurl = environment.baseUrl8083;


  constructor(private HttpClient: HttpClient) { }

  getEmailSmsmData(): Observable<any> {
    return this.HttpClient.get<any>(this.url + `emailsmstemplate/master/`);
  }

  saveEmailSms(data): Observable<any> {
    return this.HttpClient.post<any>(this.url + `emailsmstemplate/master/`, data);

  }

  updateEmailSms(data): Observable<any> {
    return this.HttpClient.post<any>(this.url + `emailsmstemplate/master/updateDetails`, data);
  }

  getModuleList(): Observable<any>{
    return this.HttpClient.get<any>(this.moduleurl + 'application-module/');
  }
}
