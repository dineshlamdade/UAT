import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositsService {

  apiUrl = environment.baseUrl8085;
  // apiUrl1 = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }

  getFDSummary() {
    return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/summary')
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

  public getFdRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }
  // getcurrentpreviousEmployeName() {

  //   return this._HTTP.get(this.apiUrl1 + 'employment-info/joining/employeeMasterId/36')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

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

