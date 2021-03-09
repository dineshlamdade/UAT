import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  apiUrl = environment.baseUrl8084;

  constructor(private http: HttpClient) { }

  getClaimFields() {
    return this.http.get(this.apiUrl + 'claim-template-standard-field-master-company/get-all-fields')
      .pipe(map((response: any) => {
        return response;
      }));

  }

  postClaimData(data){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + '/add-all-fields', data, {headers:{'X-TenantId': 'PaysquareDefault'}}) 
    .pipe(map((response: any)=>{
      return response
    }))
  }

}