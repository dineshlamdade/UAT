import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuitionFeesService {

 apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }


  getTuitionFeesSummary() {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTuitionFeesSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'tuitionFees-transaction/SummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }


   //Declaration services

  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postTuitionFeesTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'tuitionFees-transaction', data)
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

  getChildsName() {
    // return this._HTTP.get(this.apiUrl + 'previousEmployer-detail')
    // .pipe(map((res: any) => {
    //   return res;
    // }));
  }

  getAllInstitutesFromGlobal() {
    return this._HTTP.get(this.apiUrl + 'institution')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  uploadTuitionFeesTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'tuitionFees-transaction/uploadtuitionFeesTransactionDocuments',formData,
      {

      });
  }
}


