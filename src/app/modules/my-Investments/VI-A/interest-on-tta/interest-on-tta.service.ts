import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterestOnTtaService {

<<<<<<< HEAD
  apiUrl = environment.apiBaseUrl;
  apiBaseUrlEmployee = environment.baseUrl8082;
=======
  public apiUrl = environment.apiBaseUrl;
  public apiBaseUrlEmployee = environment.baseUrl8082;
>>>>>>> 3159c9ebabbcc854bba25f54a440f15ed0489d2e

  constructor(private _HTTP: HttpClient) { }

  //Summary services
  get80TTASummary() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/summary')
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

   get80TTAMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'interestonsavingdeposit80TTA-master')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  //get ifsc detail
  getDataFromIFSC(bankIFSC) : Observable<any>  {
    return this._HTTP.get(this.apiBaseUrlEmployee + '/bank-master/data/' + bankIFSC)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  //state info list
  getStateInfoList() : Observable<any>  {
    return this._HTTP.get(this.apiBaseUrlEmployee + '/location-information/state')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  //IFSC code list
  getIFSCCodeList(state : string) : Observable<any>  {
    return this._HTTP.get(this.apiBaseUrlEmployee + '/bank-master/ifsc/' + state)
    .pipe(map((res: any) => {
      return res;
    }));
  }

   //search IFSCcode service
    searchIFSC(terms: any, stateModel) {
      return this._HTTP.get(this.apiBaseUrlEmployee+ '/bank-master/ifsc/' + stateModel + '/' + terms)
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  //  Declaration services

  get80TTAWithBankNameList() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/bankList')
    // return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/MUFG BANK, LTD')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  getTransactionFilterData(bankName: String) {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTA-transaction/' + bankName)
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


  uploadMultiple80TTAMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('interestOnSavingDeposit80TTAMasterDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('interestOnSavingDeposit80TTAMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'interestonsavingdeposit80TTA-master',
      formData,
      {

      });
  }

  // upload80TTATransactionwithDocument(files: File[], data:any): Observable<any> {
  //   var formData: any = new FormData();
  //   console.log('in uploadMultipleFiles Service::', files);
  //   for (let file of files) {
  //     formData.append('interestOnSavingDeposit80TTAMasterDocuments', file);
  //   }
  //   //formData.append('licDocuments', files);
  //   formData.append('interestOnSavingDeposit80TTAMaster', JSON.stringify(data));

  //   console.log('formData', formData);

  //   formData.forEach((value, key) => {
  //     console.log(key," ",value)
  //   });
  //   //return null;
  //   return this._HTTP.post<any>(
  //     this.apiUrl + 'interestOnDeposit80TTA-transaction',
  //     formData,
  //     {

  //     });
  // }

    upload80TTATransactionwithDocument(data:any): Observable<any> {
      return this._HTTP.post<any>(
    this.apiUrl + 'interestOnDeposit80TTA-transaction',data,
    {
    });
  }
  //   upload80TTATransactionwithDocument(data:any): Observable<any> {
  //     return this._HTTP.post<any>(
  //   this.apiUrl + 'interestOnDeposit80TTA-transaction',
  //   {
  //   });
  //  }

}

