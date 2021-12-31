import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectricVehicleService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

//Summary services
  getElectricVehicleSummary() {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanMaster/electricVehicleLoanSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postElectricVehicleFuturePlan(data) {

    return this._HTTP.post(this.apiUrl + 'electricVehicleLoanMaster/interestOnFutureLoan', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }
   //Master Services

   getElectricVehicleMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanMaster')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  //  Declaration services

  getElectricVehicleLenderNameList() {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/lenderNameList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

 getElectricVehicleNoList(lenderName:any, id) {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/'+ lenderName + '/' + id )
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }


  public getElectricVehicleLoanMasterRemarkList(masterId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanMaster/GetRemarkMaster/' + masterId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getElectricVehicleLoanTransactionRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  // getElectricVehicleNoList(lenderName:String, no:any) {
  //   return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/loanAccNo/' + lenderName + '/' + no)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }
  //   ));
  // }



  // getElectricVehicleDeclarationLenderName() {
  //   return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/BOI')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }
  //   ));
  // }

  getTransactionFilterData(lenderName:String) {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/' + lenderName)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  getAccountNo(lenderName:String) {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/loanAccNo/' + lenderName)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionFilterAccountNo(lenderName:String, accountNo:any) {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/' + lenderName +'/'+ accountNo)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }



  postElectricVehicleTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'electricVehicleLoanTransaction', data)
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

  uploadMultipleElectricVehicleasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('rcBook', file);
    }
    //formData.append('licDocuments', files);
    formData.append('electricVehicleMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'electricVehicleLoanMaster',
      formData,
      {

      });
  }

  uploadElectricVehicleTransactionwithDocument(files: File[], data:any): Observable<any> {
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
      this.apiUrl + 'electricVehicleLoanTransaction/uploadElectricVehicleLoanTransactionDocuments',
      formData,
      {

      });
  }

}

