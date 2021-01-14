import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InterestOnTtbService {

  apiUrl = environment.apiBaseUrl;
  apiBaseUrlEmployee = environment.apiBaseUrlEmployee;

  constructor(private _HTTP: HttpClient) { }

  //Summary services
  get80TTBSummary() {
    return this._HTTP.get(this.apiUrl + 'nterestOnDeposit80TTA-transaction/summary')
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

   get80TTBMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'interestonsavingdeposit80TTB-master')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  getStateInfoList() : Observable<any>  {
    return this._HTTP.get(this.apiBaseUrlEmployee + 'location-information/state')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getIFSCCodeList(state : string) : Observable<any>  {
    return this._HTTP.get(this.apiBaseUrlEmployee + 'bank-master/ifsc/' + state)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  searchIFSC(terms: any, stateModel) {
    return this._HTTP.get(this.apiBaseUrlEmployee+ '/bank-master/ifsc/' + stateModel + '/' + terms)
   .pipe(map((res: any) =>{
     return res;
   }))
 }

  //  Declaration services

  get80TTAWithBankNameList() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/bankList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  // getElectricVehicleDeclarationLenderName() {
  //   return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/BOI')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }
  //   ));
  // }

  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }



  post80TTATransaction(data) {
    return this._HTTP.post(this.apiUrl + 'interestOnDeposit80TTA-transaction', data)
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


  uploadMultiple80TTBMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('interestOnSavingDeposit80TTBMasterDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('interestOnSavingDeposit80TTBMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'interestonsavingdeposit80TTB-master?interestOnSavingDeposit80TTBMaster&interestOnSavingDeposit80TTBMasterDocuments',
      formData,
      {

      });
  }

  upload80TTATransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('interestCertificate', file);
    }
    //formData.append('licDocuments', files);
    formData.append('electricVehicleLoanTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'interestOnDeposit80TTA-transaction',
      formData,
      {

      });
  }

}

