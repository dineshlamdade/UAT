import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingloanService {
  public apiUrl = environment.baseUrl8085;
  constructor(private _HTTP: HttpClient) { }

  public submitHousingLoanMasterData(propertyIndex: File[], stampDutyRegistration: File[],
    loanSanctionLetter: File[], possessionLetter: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('propertyIndex::', propertyIndex);
    console.log('stampDutyRegistration::', stampDutyRegistration);
    console.log('loanSanctionLetter::', loanSanctionLetter);
    console.log('possessionLetter::', possessionLetter);
    for (const propertyIndexFile of propertyIndex) {
      formData.append('propertyIndex', propertyIndexFile);
    }
    for (const stampDutyRegistrationFile of stampDutyRegistration) {
      formData.append('stampDutyRegistration', stampDutyRegistrationFile);
    }
    for (const loanSanctionLetterFile of loanSanctionLetter) {
      formData.append('loanSanctionLetter', loanSanctionLetterFile);
    }
    for (const possessionLetterFile of possessionLetter) {
      formData.append('possessionLetter', possessionLetterFile);
    }

    // formData.append('licDocuments', files);
    formData.append('housingLoanMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'housingLoanMaster',
      formData,
      {

      });
  }

  getHousingLoanummary() {
    return this._HTTP.get(this.apiUrl + 'housingLoanMaster/housingLoanSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postFuturePolicyPurchasesPrincipal(data){
    return this._HTTP.post(this.apiUrl + 'housingLoanMaster/housingLoanSummaryFuturePurchasePrincipal', data )
  .pipe(map((res: any) =>{
    return res;
  }))
  }

  postFuturePolicyPurchasesInvestment(data){
    return this._HTTP.post(this.apiUrl + 'housingLoanMaster/housingLoanSummaryFuturePurchaseInvestment', data )
  .pipe(map((res: any) =>{
    return res;
  }))
  }


  public getTransactionByProofSubmissionId(proofSubmissionId: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  public getHousingLoanMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housingLoanMaster')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getPropertyNamesList(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/housePropertyNameList')
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

  // //Save Transation
  // uploadTransactionWithMultipleFiles(
  //   files: File[],
  //   data: any
  // ): Observable<any> {
  //   let formData: any = new FormData();
  //  /*  console.log('declarationOfLandlordDocument::', files); */
  //   console.log('rentAgreementDocument::', files);

  //   console.log('in uploadMultipleFiles Service::', files);
  //  /*  for (const file of files) {
  //     formData.append('declarationOfLandlordDocument', file);
  //   } */
  //   // for (const file of files) {
  //   //   formData.append('rentReciept', file);
  //   // }
  //   /*
  //   for (const file of files) {
  //     formData.append('declarationOfLandlordDocument', file);
  //   } */

  //   formData.append('housePropertyTransaction', JSON.stringify(data));

  //   console.log('formData', formData);

  //   formData.forEach((value, key) => {
  //     console.log(key, ' ', value);
  //   });
  //   return this._HTTP.post<any>(
  //     this.apiUrl + 'housePropertyTransaction/uploadHousePropertyTransactionDocuments',
  //     formData,
  //     {}
  //   );
  // }


  public uploadTransactionWithMultipleFiles(bankCertificate: File[], rentalIncomeReceipt: File[],
    municipalTaxReceipt: File[],  data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('bankCertificate::', bankCertificate);
    console.log('rentalIncomeReceipt::', rentalIncomeReceipt);
    console.log('municipalTaxReceipt::', municipalTaxReceipt);
    for (const bankCertificateFile of bankCertificate) {
      formData.append('bankCertificate', bankCertificateFile);
    }
    for (const rentalIncomeReceiptFile of rentalIncomeReceipt) {
      formData.append('rentalIncomeReceipt', rentalIncomeReceiptFile);
    }
    for (const municipalTaxReceiptFile of municipalTaxReceipt) {
      formData.append('municipalTaxReceipt', municipalTaxReceiptFile);
    }

    // formData.append('licDocuments', files);
    formData.append('housePropertyTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'housePropertyTransaction/uploadHousePropertyTransactionDocuments',
      formData,
      {

      });
  }




}
