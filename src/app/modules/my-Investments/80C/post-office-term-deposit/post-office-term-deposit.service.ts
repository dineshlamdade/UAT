import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostOfficeTermDepositService {

  apiUrl = environment.apiBaseUrl;


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
  //  postOfficeTermedDeposit-transaction/SummaryFuturePolicy

  //service to be created
  // getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
  //   return this._HTTP.get(this.apiUrl + 'fdmorethan5years-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  //service to be created
  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'postOfficeTermedDeposit-transaction')
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
      this.apiUrl + 'postOfficeTermedDeposit-transaction/uploadpostOfficeTermedDepositTransactionDocuments',formData,
      {

      });
  }
}

