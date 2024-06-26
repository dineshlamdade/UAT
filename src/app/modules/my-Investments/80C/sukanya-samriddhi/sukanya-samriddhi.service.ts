import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SukanyaSamriddhiService {
  apiUrl = environment.baseUrl8085;
  apiUrl1 = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }


  getSukanyaSamriddhiSummary() {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiSchemeMaster-detail/sukanyaSamriddhiSchemeMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postSukanyaSamriddhiSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'sukanyaSamriddhiSchemeMaster-detail/sukanyaSamriddhiSchemeMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

  getSukanyaSamriddhiMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiSchemeMaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Declaration services

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getSukanyaSamriddhiDeclarationInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiScheme-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiScheme-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getSukanyaSamriddhiSchemeRemarkList(psId: String, policyNo: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiScheme-transaction/GetRemark/' + psId + '/' + policyNo)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getsukanyaSamriddhiSchemeMasterRemarkList(masterId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiSchemeMaster-detail/GetRemarkMaster/' + masterId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getsukanyaSamriddhiSchemeRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiScheme-transaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getcurrentpreviousEmployeName() {

    return this._HTTP.get(this.apiUrl1 + 'employment-info/joining/employeeMasterId/36')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'sukanyaSamriddhiScheme-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postSukanyaSamriddhiDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'sukanyaSamriddhiScheme-transaction', data)
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

    uploadMultipleSukanyaSamriddhiSchemeMasterFiles(files: File[], data:any): Observable<any> {
      var formData: any = new FormData();
      console.log('in uploadMultipleFiles Service::', files);
      for (let file of files) {
        formData.append('group1MasterDocuments', file);
      }
      //formData.append('licDocuments', files);
      formData.append('investmentGroup1MasterRequestDTO', JSON.stringify(data));

      console.log('formData', formData);

      formData.forEach((value, key) => {
        console.log(key," ",value)
      });
      //return null;
      return this._HTTP.post<any>(
        this.apiUrl + 'sukanyaSamriddhiSchemeMaster-detail',
        formData,
        {

        });
    }
    uploadSukanyaSamriddhiSchemeTransactionwithDocument(files: File[], data:any): Observable<any> {
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
        this.apiUrl + 'sukanyaSamriddhiScheme-transaction/uploadSukanyaSamriddhiSchemeDocuments',
        formData,
        {

        });
    }

}


