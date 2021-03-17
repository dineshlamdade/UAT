import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseRentService {
  public apiUrl = environment.apiBaseUrl;
  constructor(private _HTTP: HttpClient) { }

  public submitHousingLoanMasterData(houseRentalMasterDocument: File[],
     data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('houseRentalMasterDocument::', houseRentalMasterDocument);
    // console.log('stampDutyRegistration::', stampDutyRegistration);
 /*    console.log('losnSanctionLetter::', losnSanctionLetter);
    console.log('possessionLetter::', possessionLetter); */
    for (const propertyIndexFile of houseRentalMasterDocument) {
      formData.append('houseRentalMasterDocument', propertyIndexFile);
    }
    // for (const stampDutyRegistrationFile of stampDutyRegistration) {
    //   formData.append('stampDutyRegistration', stampDutyRegistrationFile);
    // }
   /*  for (const losnSanctionLetterFile of losnSanctionLetter) {
      formData.append('losnSanctionLetter', losnSanctionLetterFile);
    } */
 /*    for (const possessionLetterFile of possessionLetter) {
      formData.append('possessionLetter', possessionLetterFile);
    } */

    // formData.append('licDocuments', files);
    formData.append('houseRentalMasterDetail', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'houseRentalMaster',
      formData,
      {

      });
  }

  //Master Services
  public getHousingRentMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'houseRentalMaster')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

 /* ---------------------------------------------------------- */
//

  public getPropertyNamesList(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'houseRentalTransaction/propertyList')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }


  public getHousePropertyFilterData(propertyName: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/' + propertyName)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  public getTransactionFilterData(propertyName: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/' + propertyName)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

//Post Declaration

  public uploadTransactionWithMultipleFiles(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('transactionDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'ppf-transaction/uploadTransactionDocuments',
      formData,
      {

      });
  }
}



