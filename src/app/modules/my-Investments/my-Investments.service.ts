import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInvestmentsService {
apiUrl = environment.apiBaseUrl;


  constructor(private _HTTP: HttpClient) { }

  getNPSSummary() {
    return this._HTTP.get(this.apiUrl + 'npsmaster-detail/npsMasterSummary/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }



  getNPSMaster() {
    return this._HTTP.get(this.apiUrl + 'npsmaster-detail/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getNPSDeclaration() {
    return this._HTTP.get(this.apiUrl + 'npsmaster-detail/npsTransactionSchedule/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postNPSMaster(data) {

    return this._HTTP.post(this.apiUrl + 'npsmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  puttNPSMaster(data) {

    return this._HTTP.put(this.apiUrl + 'npsmaster-detail/1', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  putNPSDeclaration(data) {

    return this._HTTP.put(this.apiUrl + 'npsmaster-detail/npsTransactionSchedule/1', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanSummary() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanMaster() {
    return this._HTTP.get(this.apiUrl + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanDeclaration() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanMaster(data) {

    return this._HTTP.post(this.apiUrl + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanDeclaration(data) {

    return this._HTTP.post(this.apiUrl + 'educationalloan-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountSummary() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountMaster() {
    return this._HTTP.get(this.apiUrl + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountDeclaration() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postSavingAccountMaster(data) {

    return this._HTTP.post(this.apiUrl + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getPHandicapped() {
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/summary/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getFamilyInfo() {
  //   return this._HTTP.get('http://localhost:8082/hrms/v1/family-details/summary/employeeMasterId/3')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getFamilyInfo() {
    return this._HTTP.get(this.apiUrl + '/licmaster-detail/familyMemberList')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getEmployeePersonalInfo() {
  //   return this._HTTP.get('http://localhost:8082/hrms/v1/family-details/summary/employeeMasterId/3')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getHandicapped() {
    return this._HTTP.get(this.apiUrl + 'handicappeddependent-detail/summary/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postPHandicappedForm(data) {

    return this._HTTP.post(this.apiUrl + 'houserentmaster-detail/houserentmaster_agreement', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postHandicappedForm(data) {

    return this._HTTP.post(this.apiUrl + 'handicappeddependent-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseSummary() {
    return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster-detail/specifiedDiseaseMasterSummary/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseMaster() {
    return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster-detail/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEightyCSummary() {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/licMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postEightyCMaster(data) {

    return this._HTTP.post(this.apiUrl + 'licmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'licmaster-detail/licMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEightyCDeclarationInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionInstName(data) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationInstitutions(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
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

  getBusinessFinancialYear() {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/businessFinancialYear')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllPreviousEmployer() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/previousemployer')
    .pipe(map((res: any) => {
      return res;
    }));
  }

}
