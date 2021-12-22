import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostOfficeTermDepositService {

  apiUrl = environment.baseUrl8085;


  constructor(private _HTTP: HttpClient) { }


  getPOTDepositSummary() {
    return this._HTTP.get(this.apiUrl + 'postOfficeTermedDeposit-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postPOTDepositSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'postOfficeTermedDeposit-transaction/SummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

   //Declaration services

  //service to be created
  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'postOfficeTermedDeposit-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getPOSTOFFICETERMEDDEPOSITRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'postOfficeTermedDeposit-transaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'postOfficeTermedDeposit-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postPOTDepositTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'postOfficeTermedDeposit-transaction', data)
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


  uploadPOTDepositTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'postOfficeTermedDeposit-transaction/uploadpostOfficeTermedDepositDocuments',formData,
      {

      });
  }
}
