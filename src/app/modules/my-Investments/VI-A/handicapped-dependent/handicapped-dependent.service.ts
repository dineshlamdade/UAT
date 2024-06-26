import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandicappedDependentService {
  apiUrl = environment.baseUrl8085;
  apiUrlEmployee = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) { }

  getHandicappedSummary() {
    return this._HTTP.get(this.apiUrl + 'handicappedDependent-Transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Master Services

   getHandicappedDependentMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'handicappeddependent-detailmaster')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //Declaration services


  //service to be created
  getTransactionFilterData() {
    return this._HTTP.get(this.apiUrl + 'handicappedDependent-Transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'handicappedDependent-Transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postHandicappedTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'handicappedDependent-Transaction', data)
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


  public getHandicappeddependentMasterRemarkList(masterId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'handicappeddependent-detailmaster/GetRemarkMaster/' + masterId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  public getHandicappedDependentRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'handicappedDependent-Transaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }



  getFamilyInfoList() : Observable<any>  {
    return this._HTTP.get(this.apiUrl + 'handicappedDependent-Transaction/handicappedDependentMasterList')
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


  uploadMultipleHandicappedDependentMasterFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('handicappedDependantDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('handicappedDependantDetail', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'handicappeddependent-detailmaster',
      formData,
      {

      });
  }

  // uploadHandicappedTransactionwithDocument(data:any): Observable<any> {
  //   console.log('handicappedDependent-Transaction', data);

  //   return this._HTTP.post<any>(
  //     this.apiUrl + 'handicappedDependent-Transaction',data,
  //     {

  //     });


  // }


  uploadHandicappedTransactionwithDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('handicappedDependantDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('transactionWithDocument', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'handicappedDependent-Transaction',
      formData,
      {

      });
  }

}

