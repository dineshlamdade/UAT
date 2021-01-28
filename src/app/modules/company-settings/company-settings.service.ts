import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CompanySettingsService {
  apiUrl = environment.baseUrl8087;

constructor(private _HTTP: HttpClient) { }

getLoanMaster(): Observable<any>  {
  return this._HTTP.get(this.apiUrl + 'loan-Master/getAll')
    .pipe(map((res: any) => {
      return res;
    }));
}

postWorkFlowMaster(data): Observable<any>  {
  return this._HTTP.post(this.apiUrl + 'workflowmaster-header', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

putWorkFlowMaster(data): Observable<any>  {
  return this._HTTP.put(this.apiUrl + 'workflowmaster-header', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

}
