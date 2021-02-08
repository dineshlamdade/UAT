import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GgaService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }


  get80GGASummary() {
    return this._HTTP.get(this.apiUrl + 'donations80GGA-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  get80GGASummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'donations80GGA-transaction/summaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }


   //Declaration services

  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'donations80GGA-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'donations80GGA-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  post80GGATransaction(data) {
    return this._HTTP.post(this.apiUrl + 'donations80GGA-transaction', data)
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

  upload80GGATransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('donationsReciept', file);
    }
    //formData.append('licDocuments', files);
    formData.append('donations80GGATransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'donations80GGA-transaction/documents',formData,
      {

      });
  }
}
