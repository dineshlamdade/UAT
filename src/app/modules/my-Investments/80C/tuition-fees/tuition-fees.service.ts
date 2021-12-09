import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuitionFeesService {

 apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }


  getTuitionFeesSummary() {
    return this._HTTP.get(this.apiUrl + 'tuitionFeesMaster-detail/tuitionFeesMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTuitionFeesSummaryFuturePolicy(data) {
    return this._HTTP.post(this.apiUrl + 'tuitionFeesMaster-detail/tuitionFeesMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
  public gettuitionFeesMasterRemarkList(masterId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'tuitionFeesMaster-detail/GetRemarkMaster/' + masterId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


   //Declaration services

  // getTransactionFilterData() {
  //   return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

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

  public getTuitionFessRemarkList(psId: String, policyNo: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/GetRemark/' + psId + '/' + policyNo)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getpreviousEmployeName() {

  //   return this._HTTP.get(this.apiUrl + 'previousEmployer-detail')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

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
///////////////////////////////////
  //Master Services

  geMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'tuitionFeesMaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Declaration services

   getTuitionFeesInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'tuitionFees-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  postULIPTransaction(data) {
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



  uploadMultipleULIPDepositMasterFiles(files: File[], data:[]): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('group2MasterDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('investmentGroup2MasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'tuitionFeesMaster-detail',
      formData,
      {

      });
  }

  uploaTuitionFeesTransactionwithDocument(files: File[], data:any): Observable<any> {
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




