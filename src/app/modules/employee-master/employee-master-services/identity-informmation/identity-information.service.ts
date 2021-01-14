import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityInformationService {

  constructor(private httpClient: HttpClient) { }

  postIdentityInfoForm(IdentityInformation) {

    return this.httpClient.post(environment.baseUrl8082 + '/employeeIdentity-information', IdentityInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getIdentityInfoData() {
    const empId = localStorage.getItem('employeeMasterId')
    var employeeMasterId = Number(empId);

    return this.httpClient.get(environment.baseUrl8082 + '/employeeIdentity-information/' + employeeMasterId)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteGridRow(employeeMasterId, workerId) {
    let params = new HttpParams();
    // const body: FormData = new FormData();
    params = params.append('employeeMasterId', employeeMasterId);
    return this.httpClient.put(environment.baseUrl8082 + '/employeeVisa-details/' + workerId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
