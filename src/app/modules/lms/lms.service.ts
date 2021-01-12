import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const headers = new Headers({
  'Content-Type': 'application/json',
  'X-TenantId': 'PaysquareDefault',
});
@Injectable({
  providedIn: 'root',
})
export class LmsService {
  // apiUrl = environment.apiBaseUrl;
  public apiUrl = 'http://localhost:8088/hrms/v1/';

constructor(private _HTTP: HttpClient) { }

getLeavePage() {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('X-TenantId', 'PaysquareDefault');

  return this._HTTP.get(this.apiUrl + 'leave-master', { headers },
    )
    .pipe(map((res: any) => {
      return res;
    }));
  }

postLeavePage(data) {
  return this._HTTP.post(this.apiUrl + 'leave-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

postSaveWorkFlowMaster(data) {
  return this._HTTP.post(this.apiUrl + 'workflowTransaction-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

postApprovePage(data) {
  return this._HTTP.post(this.apiUrl + 'workflowMaster-report', data)
  .pipe(map((res: any) => {
    return res;
  }));
}

postApproveRejectSubmit(data) {
  return this._HTTP.post(this.apiUrl + 'workflowTransaction-master', data)
  .pipe(map((res: any) => {
    return res;
  }));
}

}
