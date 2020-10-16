import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyInvestmentsService {
  url = 'http://localhost:8085/hrms/v1/';


  constructor(private _HTTP: HttpClient) { }

  getNPSSummary() {
    return this._HTTP.get(this.url + 'npsmaster-detail/npsMasterSummary/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }



  getNPSMaster() {
    return this._HTTP.get(this.url + 'npsmaster-detail/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getNPSDeclaration() {
    return this._HTTP.get(this.url + 'npsmaster-detail/npsTransactionSchedule/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postNPSMaster(data) {

    return this._HTTP.post(this.url + 'npsmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  puttNPSMaster(data) {

    return this._HTTP.put(this.url + 'npsmaster-detail/1', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  putNPSDeclaration(data) {

    return this._HTTP.put(this.url + 'npsmaster-detail/npsTransactionSchedule/1', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanSummary() {
    return this._HTTP.get(this.url + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanMaster() {
    return this._HTTP.get(this.url + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanDeclaration() {
    return this._HTTP.get(this.url + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanMaster(data) {

    return this._HTTP.post(this.url + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanDeclaration(data) {

    return this._HTTP.post(this.url + 'educationalloan-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountSummary() {
    return this._HTTP.get(this.url + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountMaster() {
    return this._HTTP.get(this.url + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountDeclaration() {
    return this._HTTP.get(this.url + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postSavingAccountMaster(data) {

    return this._HTTP.post(this.url + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getPHandicapped() {
    return this._HTTP.get(this.url + 'physicallyhandicapped-detail/summary/3')
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
    return this._HTTP.get(this.url + '/licmaster-detail/familyMemberList')
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
    return this._HTTP.get(this.url + 'handicappeddependent-detail/summary/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postPHandicappedForm(data) {

    return this._HTTP.post(this.url + 'houserentmaster-detail/houserentmaster_agreement', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postHandicappedForm(data) {

    return this._HTTP.post(this.url + 'handicappeddependent-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseSummary() {
    return this._HTTP.get(this.url + 'specifiedDiseaseMaster-detail/specifiedDiseaseMasterSummary/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseMaster() {
    return this._HTTP.get(this.url + 'specifiedDiseaseMaster-detail/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCMaster() {
    return this._HTTP.get(this.url + 'licmaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEightyCSummary() {
    return this._HTTP.get(this.url + 'licmaster-detail/licMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postEightyCMaster(data) {

    return this._HTTP.post(this.url + 'licmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.url + 'licmaster-detail/licMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.url + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEightyCDeclarationInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.url + 'lic-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionInstName(data) {
    return this._HTTP.get(this.url + 'lic-transaction/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationInstitutions(data) {

    return this._HTTP.post(this.url + '/lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {

    return this._HTTP.post(this.url + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getpreviousEmployeName() {

    return this._HTTP.get(this.url + 'previousEmployer-detail')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllInstitutesFromGlobal() {
    return this._HTTP.get(this.url + 'institution')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getBusinessFinancialYear() {
    return this._HTTP.get(this.url + 'licmaster-detail/businessFinancialYear')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllPreviousEmployer() {
    return this._HTTP.get(this.url + 'lic-transaction/previousemployer')
    .pipe(map((res: any) => {
      return res;
    }));
  }

}
