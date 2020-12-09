import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
const headers = new Headers({
  'Content-Type': 'application/json',
  'X-TenantId': 'PaysquareDefault',
});
@Injectable({
  providedIn: 'root',
})
export class workflowService {
  // apiUrl = environment.apiBaseUrl;
  public apiUrl = 'http://localhost:8088/hrms/v1/';

  
constructor(private _HTTP: HttpClient) { }

getMasterServiceList(): Observable<any>  {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  return this._HTTP.get(this.apiUrl + 'workflowService-master', { headers },
    )
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getMasterSummaryData(): Observable<any>  {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    return this._HTTP.get(this.apiUrl + 'workflowmaster-header', { headers },
      )
      .pipe(map((res: any) => {
        return res;
      }));
    }

postMasterFormData(data): Observable<any>   {
  return this._HTTP.post(this.apiUrl + 'workflowmaster-header', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

}
