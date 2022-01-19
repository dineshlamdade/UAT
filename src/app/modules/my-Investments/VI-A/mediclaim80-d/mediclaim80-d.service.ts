import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';
import {AuthService} from '../../../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class Mediclaim80DService {

  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient ,
     private authService: AuthService,
     ) { }

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

   //Mediclaim Premium Institution Name List
  getMediclaimPremiumWithInstitutionList() {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/mediclaimPremiumInstitutionList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  getTransactionFilterData(expenseType:String, institution:String) {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/' + expenseType + '/' + institution)
    .pipe(map((res: any) => {
      return res;
    }));
  }




  public getmediclaimMasterRemarkList(masterId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'mediclaimMaster/GetRemarkMaster/' + masterId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  public getmediclaimTransactionRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  // getTransactionFilterData(){
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }


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

    let token = this.authService.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
     console.log("headers::", headers)

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

      headers: headers

  }

  uploadMediclaim80DDocument(files: File[], data:any): Observable<any> {

    let token = this.authService.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
     console.log("headers::", headers)

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
