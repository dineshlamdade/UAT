import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  apiUrl = environment.baseUrl8084;
  constructor(private http: HttpClient) { }


  getSummaryFields() {
    return this.http.get(this.apiUrl + 'reim-list-summary-head-template-standard-field-master-company/get-all-fields')
      .pipe(map((response: any) => {
        return response;
      }));
      
  }

  postSummaryData(data) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this.http.post(this.apiUrl + '', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((response: any) => {
        return response
      }))
  }
}
