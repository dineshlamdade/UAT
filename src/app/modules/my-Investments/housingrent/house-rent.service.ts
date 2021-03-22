import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HouseRentService {
  public apiUrl = environment.baseUrl8085;
  constructor(private _HTTP: HttpClient) { }
  
  /*....................Master Summary............................... */
  gethouseRentSummary() {
    return this._HTTP
      .get(this.apiUrl + 'houseRentalMaster/transactionSummary')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

/* ...........................House Rental Master.................. */
 
  public submitHousingRentMasterData(declarationOfLandlordDocument: File[], rentAgreementDocument: File[],
     data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('declarationOfLandlordDocumentFile::', declarationOfLandlordDocument);
    console.log('rentAgreementDocument::', rentAgreementDocument);
    for (const declarationOfLandlordDocumentFile of declarationOfLandlordDocument) {
      formData.append('declarationOfLandlordDocument', declarationOfLandlordDocumentFile);
    }
    for (const rentAgreementDocumentFile of rentAgreementDocument) {
      formData.append('rentAgreementDocument', rentAgreementDocumentFile);
    }

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

/*................  Master Services.........................*/
  public getHousingRentMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'houseRentalMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /* -------------------------House Name Dropdown--------------------------------- */

  getPropertyNamesList() {
    return this._HTTP
      .get(this.apiUrl + 'houseRentalTransaction/propertyList')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

/*................ houseRentalTransaction............................ */
  public getTransactionFilterData(houseName: String): Observable<any> {
    return this._HTTP
      .get(this.apiUrl + 'houseRentalTransaction/' + houseName)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

/*   -----GET /houseRentalTransaction/psid/{proofSubmissionId} */

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP
      .get(this.apiUrl + 'houseRentalTransaction/psid/' + proofSubmissionId)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'houseRentalTransaction', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  
  
  
/* .................... houseRentalTransaction Post Declaration......................... */

  uploadTransactionWithMultipleFiles(
    files: File[],
    data: any
  ): Observable<any> {
    let formData: any = new FormData();
   /*  console.log('declarationOfLandlordDocument::', files); */
    console.log('rentAgreementDocument::', files);

    console.log('in uploadMultipleFiles Service::', files);
   /*  for (const file of files) {
      formData.append('declarationOfLandlordDocument', file);
    } */
    for (const file of files) {
      formData.append('rentReciept', file);
    }
    /* 
    for (const file of files) {
      formData.append('declarationOfLandlordDocument', file);
    } */
   
    formData.append('houseRentalTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    return this._HTTP.post<any>(
      this.apiUrl + 'houseRentalTransaction/documents',
      formData,
      {}
    );
  }


/* uploadTransactionWithMultipleFiles(rentReciept: File[], bankStatement: File[],
    data: any): Observable<any> {
   let formData: any = new FormData();
   console.log('rentRecieptFile::', rentReciept);
   console.log('bankStatement::', bankStatement);
   for (const rentRecieptFile of rentReciept) {
     formData.append('rentReciept', rentRecieptFile);
   }
   for (const bankStatementFile of bankStatement) {
     formData.append('bankStatement', bankStatementFile);
   }
   formData.append('houseRentalTransaction', JSON.stringify(data));

   console.log('formData', formData);

   formData.forEach((value, key) => {
     console.log(key, ' ', value);
   });
   return this._HTTP.post<any>(
     this.apiUrl + '/houseRentalTransaction/documents',
     formData,
     {

     });
 } */

}


