import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialMasterService {
  // public apiUrl = environment.apiBaseUrl;
  apiUrl = environment.baseUrl8084;
  
  constructor(
    private _HTTP: HttpClient) { }



getAllRecords() {
  let data = {
    "employeeMasterId":1,
    "payrollArea":"PA-Staff"
  }
  return this._HTTP.get('http://localhost:8084/hrms/v1/financial-master/financialMasterAPIRecordsUI?employeeMasterId=1&payrollArea=PA-Staff')
  .pipe(map((res: any) => {
    return res;
  }
  ));
}

postfinancialMaster(data) {

  return this._HTTP.post(this.apiUrl + '/financial-master', data)
  .pipe(map((res: any) => {
    return res;
  }));
}

}
