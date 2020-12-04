import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositsService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }

  getFDSummary() {
    return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/summary')
    // return this._HTTP.get(this.apiUrl + 'nscMaster-detail/nscMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getFDSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'fdmorethan5years-transaction/SummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

   //Declaration services

  //service to be created
  // getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
  //   return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  //service to be created
  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postFDTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'fdmorethan5years-transaction', data)
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

  // uploadMultipleNSCMasterFiles(files: File[], data:any): Observable<any> {
  //   var formData: any = new FormData();
  //   console.log('in uploadMultipleFiles Service::', files);
  //   for (let file of files) {
  //     formData.append('group2MasterDocuments', file);
  //   }
  //   //formData.append('licDocuments', files);
  //   formData.append('investmentGroup2MasterRequestDTO', JSON.stringify(data));

  //   console.log('formData', formData);

  //   formData.forEach((value, key) => {
  //     console.log(key," ",value)
  //   });
  //   //return null;
  //   return this._HTTP.post<any>(
  //     this.apiUrl + 'nscMaster-detail',
  //     formData,
  //     {

  //     });
  // }

  uploadFDTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'fdmorethan5years-transaction/uploadfdmorethan5yearsTransactionDocuments',formData,
      {

      });
  }
}

