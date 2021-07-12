import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { InvestmentApprovalEmployeeInfo } from '../interfaces/investment-approval-employee-info';
import { EmployeeInfo } from '../interfaces/mocks';
import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';
import { APIResponse } from '../interfaces/apiresponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvestmentMasterApprovalService {
  public apiUrl = environment.baseUrl8085;
  public apiUrlEmployee = environment.baseUrl8082;

  constructor(private httpClient: HttpClient) {}

  getEmployeeInfo(
    employeeMasterId: any
  ): Observable<InvestmentApprovalEmployeeInfo> {
    // const investmentApprovalEmployeeInfo = of(EmployeeInfo);
    // return investmentApprovalEmployeeInfo;
    return this.httpClient
      .get<APIResponse>(
        this.apiUrlEmployee + 'employee-fin-details/' + employeeMasterId
      )
      .pipe(
        map(
          (response: APIResponse) =>
            response.data.results[0][0] as InvestmentApprovalEmployeeInfo
        )
      );
  }

  getMasterInfo(psid: any): Observable<InvestmentApprovalMasterInfo> {
    // const investmentApprovalEmployeeMasterInfo = of(MasterInfo);
    // return investmentApprovalEmployeeMasterInfo;
    return this.httpClient
      .get<APIResponse>(this.apiUrl + 'master-approval/psid/' + psid)
      .pipe(
        map(
          (response: APIResponse) =>
            response.data.results[0] as InvestmentApprovalMasterInfo
        )
      );
  }

  changeMasterStatus(formData: any) {
    return this.httpClient.post<APIResponse>(
      this.apiUrl + 'master-approval',
      formData
    );
  }

  changeMasterDocumentStatus(formData: any) {
    return this.httpClient.post<APIResponse>(
      this.apiUrl + 'master-approval/document',
      formData
    );
  }
}
