import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhysicallyHandicappedService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

  getPhysicallyHandicappedSummary() {
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  // getFDSummaryFuturePolicy(data) {
  //   return this._HTTP.post(this.apiUrl + 'fdmorethan5years-transaction/SummaryFuturePolicy', data)
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
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/physicallypsid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getphysicallyhandicappedTransactionByProofSubmissionId(proofSubmissionId: String) {
  //   return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/physicallypsid/' + proofSubmissionId)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  postPhysicallyHandicappedTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'physicallyhandicapped-detail', data)
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
  public getphysicallyhandicappedTransactionRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  uploadPhysicallyHandicappedTransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('transactionDocuments', file);
    }
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'physicallyhandicapped-detail',formData,
      {

      });
  }
}
