import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GgcService {

  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

  get80GGCSummary() {
    return this._HTTP.get(this.apiUrl + 'donations80GGC-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  get80GGCSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'donations80GGC-transaction/summaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }


   //Declaration services

  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'donations80GGC-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getTransactionByProofSubmissionId(proofSubmissionId: String) {
  //   return this._HTTP.get(this.apiUrl + 'donations80GGC-transaction/psid/{proofSubmissionId}?proofSubmissionId=' + proofSubmissionId)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'donations80GGC-transaction/psid/{proofSubmissionId}?proofSubmissionId=' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  post80GGCTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'donations80GGC-transaction', data)
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


  // getAllInstitutesFromGlobal() {
  //   return this._HTTP.get(this.apiUrl + 'institution')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  upload80GGCTransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('donationsReciept', file);
    }
    //formData.append('licDocuments', files);
    formData.append('donations80GGCTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'donations80GGC-transaction/documents',formData,
      {

      });
  }
}
