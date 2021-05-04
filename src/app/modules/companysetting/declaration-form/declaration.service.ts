import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  apiUrl = environment.baseUrl8089;
  apiUrl2 = environment.baseUrl8091;

  constructor(private http: HttpClient) { }

  // getClaimFields() {
  //   return this.http.get(this.apiUrl + 'reim-list-summary-head-template-standard-field-master-company/get-all-fields')
  //     .pipe(map((response: any) => {
  //       return response;
  //     }));

  // }

  getClaimTemplateList(){
    return this.http.get(this.apiUrl + 'declaration-message-company/get-all_declaration_template')
    .pipe(map((response: any) => {
      return response
    }));
  }

  getStandardKeyword(){
    return this.http.get(this.apiUrl2 + 'StandardKeyword')
    .pipe(map((response: any) => {
      return response
    }));
  }

  

getClaimTemplateViewById(regClaimTemplateId, companyId){
  return this.http.get(this.apiUrl + 'declaration-message-company/get-remb-declaration-message/' + regClaimTemplateId + "/" + companyId)
  .pipe(map((response:any)=>{
    return response
  }));
}


  postClaimData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + 'declaration-message-company/save-decalaration-msg', data, {headers:{'X-TenantId': 'PaysquareDefault'}}) 
    .pipe(map((response: any)=>{
      return response
    }))
  }

  editClaimData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.put(this.apiUrl + 'declaration-message-company/edit-template', data, {headers:{'X-TenantId': 'PaysquareDefault'}}) 
    .pipe(map((response: any)=>{
      return response
    }))
  }
}