import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Mediclaim80DService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }

//Summary services
  getMediclaimSummary() {
    return this._HTTP.get(this.apiUrl + 'mediclaimMaster/mediclaimSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  // postElectricVehicleFuturePlan(data) {

  //   return this._HTTP.post(this.apiUrl + 'electricVehicleLoanMaster/interestOnFutureLoan', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }
   //Master Services

   getMediclaimMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'mediclaimMaster')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //  Declaration services

<<<<<<< HEAD
   //Mediclaim Premium Institution Name List
=======
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  getMediclaimPremiumWithInstitutionList() {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/mediclaimPremiumInstitutionList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

<<<<<<< HEAD
  getTransactionFilterData(expenseType:String, institution:String) {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/' + expenseType + '/' + institution)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getTransactionFilterData(){
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
=======
  // getTransactionFilterData(expenseType:String, institution:String) {
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All' + expenseType + '/' + institution)
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

<<<<<<< HEAD
=======
  getTransactionFilterData(){
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
    .pipe(map((res: any) => {
      return res;
    }));
  }

>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

  // getTransactionFilterData() {
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }


  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  //902 line
  postMediclaimTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'mediclaimTransaction/uploadMediclaimTransactionDocuments', data)
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

  uploadMultipleMediclaimMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('document', file);
    }
    //formData.append('licDocuments', files);
    formData.append('mediclaimMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'mediclaimMaster',
      formData,
      {

      });
  }

  uploadMediclaim80DDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('document', file);
    }
    //formData.append('licDocuments', files);
    formData.append('mediclaimTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'mediclaimTransaction/uploadMediclaimTransactionDocuments',
      formData,
      {

      });
  }

}
