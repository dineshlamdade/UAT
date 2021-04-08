import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RembRegistrationService {

  apiUrl = environment.baseUrl8089;

  constructor(private http: HttpClient) { }

  getHeadMasterFields(headId){
    return this.http.get(this.apiUrl + 'registration-template/head-master-id/' + headId )
    .pipe(map((response:any)=>{
      return response;
    }))
  }

  getAllTemplates(){
    return this.http.get(this.apiUrl + 'reimbursement-employee-registration/get-all-telephone-employee-registration')
    .pipe(map((response:any)=>{
      return response;
    }))
  }


  
  postRegisterData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + 'reimbursement-employee-registration/save-employee-registration', data, {headers: { 'X-TenantId': 'PaysquareDefault' } } )
    .pipe(map((response:any)=>{
      return response;
    }))
  }
}
