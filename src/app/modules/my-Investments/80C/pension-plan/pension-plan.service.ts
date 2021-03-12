import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

 @Injectable({
  providedIn: 'root'
 })
 export class PensionPlanService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

//Summary services
  getPensionPlanSummary() {
    return this._HTTP.get(this.apiUrl + 'pensionPlanMaster-detail/pensionPlanMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postPensionPlanFuturePlan(data) {

    return this._HTTP.post(this.apiUrl + 'pensionPlanMaster-detail/pensionPlanMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

  getPensionPlanMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'pensionPlanMaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  //  Declaration services

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getPensionPlanDeclarationInstitutionListWithPolicyNo() {
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

  postPensionPlanTransaction(data) {
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

  uploadMultiplePensionPlanMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('group1MasterDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('investmentGroup1MasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'pensionPlanMaster-detail',
      formData,
      {

      });
  }

  uploadPensionPlanTransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('transactionDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'pensionPlan-transaction/uploadPensionPlanTransactionDocuments',
      formData,
      {

      });
  }

}

