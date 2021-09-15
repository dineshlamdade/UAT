import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoanMasterService {

  url = environment.baseUrl8087;
  public apiUrl = environment.baseUrl8091;
  public apiUrl1 = environment.baseUrl8083;
  public apiUrl2 = environment.baseUrl8088;
  public apiUrl3 = environment.baseUrl8082;

  constructor(private HttpClient: HttpClient) { }

  /** Get All Loan Summary data */
  getLoanSummaryData() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `loan-Master/getAll`);
  }

  /** LoanMaster Get All Deduction head */
  getDeductionHead(): Observable<any> {
    return this.HttpClient.get<any>(this.url + `loan-Master/getDeduction`);
  }

  /** LoanMaster get All Earning Heads  */
  getEarningHead(): Observable<any> {
    return this.HttpClient.get<any>(this.url + `loan-Master/getEarning`);
  }

  /** LoanMaster save data  */
  saveLoanMasterData(data): Observable<any> {
    return this.HttpClient.post<any>(this.url + `loan-Master/add`,data);
  }

   /** LoanMaster update data  */
   updateLoanMasterData(data): Observable<any> {
    return this.HttpClient.put<any>(this.url + `loan-Master/update`,data);
  }

  // workflow get data
  getAllWorkflowMasters() {
    return this.HttpClient.get(this.apiUrl2 + 'workflowmaster-header/getAllWorkflowMasters')
      .pipe(map((res: any) => {
        return res;
      }));
  }

 // workflow get data
 getAllapprovalWorkFlowSDM() {
  return this.HttpClient.get(this.apiUrl1 + 'source-derived-matrix/1')
    .pipe(map((res: any) => {
      return res;
    }));
}
getAllDerivedSDM() {
  return this.HttpClient.get(this.apiUrl1 + 'source-derived-matrix/derived-master/67')
    .pipe(map((res: any) => {
      return res;
    }));
}


}
