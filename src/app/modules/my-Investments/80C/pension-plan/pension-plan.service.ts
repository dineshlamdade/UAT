import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

 @Injectable({
  providedIn: 'root'
 })
 export class PensionPlanService {
  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }

//Summary services
  getEightyCSummary() {
    return this._HTTP.get(this.apiUrl + 'pensionPlanmaster-detail/pensionPlanMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'pensionPlanMaster-detail/pensionPlanMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

  getEightyCMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'pensionPlanmaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Declaration services

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEightyCDeclarationInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.apiUrl + 'pensionPlan-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'pensionPlan-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'pensionPlan-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'pensionPlan-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getpreviousEmployeName() {

    return this._HTTP.get(this.apiUrl + 'previousEmployer-detail')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllInstitutesFromGlobal() {
    return this._HTTP.get(this.apiUrl + 'institution')
    .pipe(map((res: any) => {
      return res;
    }));
  }

}

