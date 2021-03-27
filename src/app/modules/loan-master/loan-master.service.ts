import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoanMasterService {

  url = environment.baseUrl8087;

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
}
