import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpsService {

  apiUrl = environment.baseUrl8085;
  apiUrlEmployee = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }


  getNpsSummary() {
    return this._HTTP.get(this.apiUrl + 'npsMaster-detail/npsMasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getNpsSummaryFuturePlan(data) {

    return this._HTTP.post(this.apiUrl + 'npsMaster-detail/npsMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

  getNpsMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'npsMaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Declaration services

   getNpsDeclarationInstitutionListWithAccountNo() {
    return this._HTTP.get(this.apiUrl + 'nps-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  // postNpsDeclarationTransaction(data) {
  //   return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
    return this._HTTP.get(this.apiUrl + 'nps-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

   getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'nps-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  getpreviousEmployeName() {
    return this._HTTP.get(this.apiUrl + 'previousemployer')
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

  getIdentityInformation () {
    return this._HTTP.get(this.apiUrlEmployee + '/employeeIdentity-information/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }


  uploadMultipleNpsDepositMasterFiles(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'npsMaster-detail',
      formData,
      {

      });
  }

  uploadNpsTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'nps-transaction/uploadNPSDocuments',
      formData,
      {

      });
  }
}
