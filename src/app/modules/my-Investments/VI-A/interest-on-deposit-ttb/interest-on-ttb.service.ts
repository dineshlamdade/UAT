import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InterestOnTtbService {

  public apiUrl = environment.apiBaseUrl;
  public apiBaseUrlEmployee = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }

  //Summary services
  get80TTBSummary() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTB-transaction/summary')
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

  get80TTBWithBankNameList() {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTB-transaction/bankList')
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

  getTransactionFilterData(bankName:String) {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTB-transaction/' + bankName)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'interestOnDeposit80TTB-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }



  post80TTBTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'interestOnDeposit80TTB-transaction', data)
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
      this.apiUrl + 'interestonsavingdeposit80TTB-master',
      formData,
      {

      });
  }

  // upload80TTBTransactionwithDocument(files: File[], data:any): Observable<any> {
  //   var formData: any = new FormData();
  //   console.log('in uploadMultipleFiles Service::', files);
  //   for (let file of files) {
  //     formData.append('interestCertificate', file);
  //   }
  //   //formData.append('licDocuments', files);
  //   formData.append('electricVehicleLoanTransaction', JSON.stringify(data));

  //   console.log('formData', formData);

  //   formData.forEach((value, key) => {
  //     console.log(key," ",value)
  //   });
  //   //return null;
  //   return this._HTTP.post<any>(
  //     this.apiUrl + 'interestOnDeposit80TTB-transaction',
  //     formData,
  //     {

  //     });
  // }

  upload80TTBTransactionwithDocument(data:any): Observable<any> {
    return this._HTTP.post<any>(
   this.apiUrl + 'interestOnDeposit80TTB-transaction',data,
   {
   });
}


}
