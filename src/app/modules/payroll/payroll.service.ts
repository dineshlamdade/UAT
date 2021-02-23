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
export class PayrollService {

  public apiUrl = environment.baseUrl8084;
  public apiUrlBusinessCycle = environment.baseUrl8086;
  //public apiUrl = 'http://localhost:8088/hrms/v1/';

constructor(private _HTTP: HttpClient) { }

getPayrollAreaDetails() {
  return this._HTTP.get(this.apiUrl + 'payrollArea-details')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getBussinessCycleDetails() {
    return this._HTTP.get(this.apiUrlBusinessCycle + 'business-cycle')
      .pipe(map((res: any) => {
        return res;
      }));
    }

  putCertificateMaster(data, id): Observable<any>  {
    return this._HTTP.put(this.apiUrl + 'payrollArea-details' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

postPayrollAreaDetails(data) {
  return this._HTTP.post(this.apiUrl + 'payrollArea-details', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

}
