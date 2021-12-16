import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../interfaces/apiresponse';
import { InvestmentApprovalTransactionInfo } from '../interfaces/investment-approval-transaction-info';

@Injectable({
  providedIn: 'root',
})
export class InvestmentTransactionApprovalService {

  public apiUrl = environment.baseUrl8085;
  public apiUrlEmployee = environment.baseUrl8082;
  _HTTP: any;

  constructor(private httpClient: HttpClient) {}

  // --------- GET API for get Transaction info by PSID ------------------------------
  getTransactionInfoByPSID(
    psid: any
  ): Observable<InvestmentApprovalTransactionInfo> {
    return this.httpClient
      .get<APIResponse>(this.apiUrl + 'transaction-approval/psid/' + psid)
      .pipe(
        map(
          (response: APIResponse) =>
            response.data.results[0] as InvestmentApprovalTransactionInfo
        )
      );
  }

  // --------- POST API for changing Transaction List status ---------------------------------
  changeTransactionStatus(formData: any) {
    return this.httpClient.post<APIResponse>(
      this.apiUrl + 'transaction-approval',
      formData
    ) .pipe(
      map(
        (response: APIResponse) =>
          response.data.results[0] as InvestmentApprovalTransactionInfo
      )
    );
  }
  public getTransactionDocumentApprovalRemarkList(psId: String,): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'lic-transaction/GetRemarkTransactionDocument/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }
  
  public getTransactionApprovalRemarkList(transactionId: String,): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'lic-transaction/GetRemarkTransaction/' + transactionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  // postTransactionApprovalRemark(data) {
  //   return this._HTTP.post(this.apiUrl + 'licmaster-detail/addRemark', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

}
