import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TuitionFeesService {

  apiUrl = environment.apiBaseUrl;


  constructor(private _HTTP: HttpClient) { }

  //Summary Services

  getSeniorCitizenSummary() {
    return this._HTTP.get(this.apiUrl + 'seniorCitizenSavingScheme-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  saveSeniorCitizenSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'seniorCitizenSavingScheme-transaction/SummaryFuturePolicy', data)
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

    getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'seniorCitizenSavingScheme-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'seniorCitizenSavingScheme-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postSeniorCitizenTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'seniorCitizenSavingScheme-transaction', data)
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

  uploadSeniorCitizenTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + '/seniorCitizenSavingScheme-transaction/uploadseniorCitizenSavingSchemeDocuments',formData,
      {

      });
  }
}

