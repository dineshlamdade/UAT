import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  apiUrl = environment.baseUrl8089;

  constructor(private http: HttpClient) { }

  getClaimFields() {
    return this.http.get(this.apiUrl + 'reim-list-summary-head-template-standard-field-master-company/get-all-fields')
      .pipe(map((response: any) => {
        return response;
      }));

  }

  getClaimTemplateList(){
    return this.http.get(this.apiUrl + 'summary-template/get-all-Templates')
    .pipe(map((response: any) => {
      return response
    }));
  }


getClaimTemplateViewById(regClaimTemplateId){
  return this.http.get(this.apiUrl + 'summary-template/summarytemplateid/' + regClaimTemplateId)
  .pipe(map((response:any)=>{
    return response
  }));
}


  postClaimData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + 'summary-template/create-template', data, {headers:{'X-TenantId': 'PaysquareDefault'}}) 
    .pipe(map((response: any)=>{
      return response
    }))
  }

  editClaimData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.put(this.apiUrl + 'summary-template/edit-template', data, {headers:{'X-TenantId': 'PaysquareDefault'}}) 
    .pipe(map((response: any)=>{
      return response
    }))
  }
}