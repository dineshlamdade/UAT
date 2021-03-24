import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailSmsService {

  // url = environment.baseUrl8085;

  url;

  constructor(private HttpClient: HttpClient) { }

  getEmailSmsmData() : Observable<any> {
    return this.HttpClient.get<any>(this.url + ``);
  }

  saveEmailSms(){}
}
