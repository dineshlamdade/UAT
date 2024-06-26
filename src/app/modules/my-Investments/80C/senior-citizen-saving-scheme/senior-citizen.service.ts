import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeniorCitizenService {
  apiUrl = environment.baseUrl8085;


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

    getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'seniorCitizenSavingScheme-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getSENIORCITIZENSAVINGSSCHEMERemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'seniorCitizenSavingScheme-transaction/GetRemarkTransaction/' + psId)
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

    return this._HTTP.get(this.apiUrl + 'lic-transaction/previousemployer')
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
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'seniorCitizenSavingScheme-transaction/uploadseniorCitizenSavingSchemeDocuments',formData,
      {

      });
  }
}

