import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from './interfaces/apiresponse';
import { InvestmentApprovalDashboardEmployeeInfo } from './interfaces/investment-approval-dashboard-employee-info';
import { InvestmentApprovalDashboardInfo } from './interfaces/investment-approval-dashboard-info';

@Injectable({
  providedIn: 'root',
})
export class InvestmentApprovalService {
  public apiUrl = environment.baseUrl8085;

  constructor(private httpClient: HttpClient) {}

  getDashboardEmployeeList(): Observable<InvestmentApprovalDashboardInfo> {
    return this.httpClient
      .get<APIResponse>(this.apiUrl + 'approval-DashBoard')
      .pipe(
        map(
          (response: APIResponse) =>
            response.data.results[0] as InvestmentApprovalDashboardInfo
        )
      );
  }
}
