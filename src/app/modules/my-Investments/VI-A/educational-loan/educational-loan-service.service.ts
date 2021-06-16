import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationalLoanServiceService {

  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

//Summary services
getEducationalLoanSummary() {
    return this._HTTP.get(this.apiUrl + 'educationalLoanMaster/educationalLoanSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getEducationalLoanSummaryFuturePlan(data) {

    return this._HTTP.post(this.apiUrl + 'educationalLoanMaster/interestOnFutureLoan', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

   getEducationalLoanMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'educationalLoanMaster')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getFamilyInfo() : Observable<any>  {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/familyMemberList')
    .pipe(map((res: any) => {
      return res;
    }));
  }


  //  Declaration services

  getEducationalLoanLenderNameList() {
    return this._HTTP.get(this.apiUrl + 'educationalLoanTransaction/lenderNameList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  // getElectricVehicleDeclarationLenderName() {
  //   return this._HTTP.get(this.apiUrl + 'educationalLoanTransaction/SBI')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }
  //   ));
  // }

  getTransactionFilterData(lender:String) {
    return this._HTTP.get(this.apiUrl + 'educationalLoanTransaction/' + lender)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getTransactionByProofSubmissionId(proofSubmissionId: String) {
  //   return this._HTTP.get(this.apiUrl + 'educationalLoanTransaction/psid/' + proofSubmissionId)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'educationalLoanTransaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }



  postEducationalLoanTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'educationalLoanTransaction', data)
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


  uploadMultipleEducationalLoanMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('loanSanctionLetter', file);
    }
    //formData.append('licDocuments', files);
    formData.append('educationalLoanMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'educationalLoanMaster',
      formData,
      {

      });
  }

  uploadEducationalLoanTransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('interestCertificate', file);
    }
    //formData.append('licDocuments', files);
    formData.append('educationalLoanTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'educationalLoanTransaction/uploadEducationalLoanTransactionDocuments',
      formData,
      {

      });
  }

}
