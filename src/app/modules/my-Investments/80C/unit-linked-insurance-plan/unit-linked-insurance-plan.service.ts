import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitLinkedInsurancePlanService {

    apiUrl = environment.apiBaseUrl;

    constructor(private _HTTP: HttpClient) { }


    getULIPSummary() {
      return this._HTTP.get(this.apiUrl + 'ulipMaster-detail/ulipMasterSummary')
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    getULIPSummaryFuturePlan(data) {

      return this._HTTP.post(this.apiUrl + 'ulipMaster-detail/ulipMasterSummaryFuturePolicy', data)
      .pipe(map((res: any) => {
        return res;
      }));
    }
     //Master Services

    getULIPMaster() : Observable<any> {
      return this._HTTP.get(this.apiUrl + 'ulipMaster-detail')
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

     //Declaration services

     getULIPInstitutionListWithPolicyNo() {
      return this._HTTP.get(this.apiUrl + 'ulip-transaction/institutionListWithPolicyNo')
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
      return this._HTTP.get(this.apiUrl + 'ulip-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
      .pipe(map((res: any) => {
        return res;
      }));
    }

    getTransactionByProofSubmissionId(proofSubmissionId: String) {
      return this._HTTP.get(this.apiUrl + 'ulip-transaction/psid/' + proofSubmissionId)
      .pipe(map((res: any) => {
        return res;
      }));
    }

    postULIPTransaction(data) {
      return this._HTTP.post(this.apiUrl + 'ulip-transaction', data)
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

    uploadMultipleULIPDepositMasterFiles(files: File[], data:any): Observable<any> {
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
        this.apiUrl + 'ulipMaster-detail',
        formData,
        {

        });
    }

    uploadULIPTransactionwithDocument(files: File[], data:any): Observable<any> {
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
        this.apiUrl + 'ulip-transaction/uploadULIPgDepositDocuments',
        formData,
        {

        });
    }
  }

