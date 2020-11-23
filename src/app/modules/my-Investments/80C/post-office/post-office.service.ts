import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostOfficeService {
  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }


  getEightyCSummary() {
    return this._HTTP.get(this.apiUrl + 'postOfficeRecurringDepositMaster-detail/postOfficeRecurringDepositMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'postOfficeRecurringDepositMaster-detail/postOfficeRecurringDepositMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

  getEightyCMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'postOfficeRecurringDepositMaster-detail')
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
    return this._HTTP.get(this.apiUrl + 'postOfficeRecurringDeposit-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'postOfficeRecurringDeposit-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'postOfficeRecurringDeposit-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'postOfficeRecurringDeposit-transaction', data)
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

  uploadMultiplePostOfficeRecurringDepositMasterFiles(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'postOfficeRecurringDepositMaster-detail',
      formData,
      {

      });
  }

  uploadPostOfficeRecurringTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'postOfficeRecurringDeposit-transaction/uploadPostOfficeRecurringDepositDocuments',
      formData,
      {

      });
  }
}

