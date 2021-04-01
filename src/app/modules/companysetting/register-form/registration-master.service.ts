import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationMasterService {

  apiUrl = environment.baseUrl8089;

  constructor(private http: HttpClient) { }

  getRegistrationFields() {
    return this.http.get(this.apiUrl + 'registration-template-standard-field-master/get-all-fields')
      .pipe(map((response: any) => {
        return response;
      }));

  }
  getRegisterTemplateList() {
    return this.http.get(this.apiUrl + 'registration-template/get-all-Templates')
      .pipe(map((response: any) => {
        return response;
      }));
  }

  postRegisterData(data) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + 'registration-template/create-template', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((response: any) => {
        return response
      }))
  }
  getRegisterTemplateViewById(regTemplateId: String) {
    return this.http.get(this.apiUrl + 'registration-template/registrationtemplateid/' + regTemplateId)
      .pipe(map((response: any) => {
        return response
      }));
  }

  editRegisterData(data) {
    return this.http.put(this.apiUrl + 'registration-template/edit-template/', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((response) => {
        return response
      }));
  }

}
