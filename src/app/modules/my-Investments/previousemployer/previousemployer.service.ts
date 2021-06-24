import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PreviousEmployerService {
  public apiUrl = environment.baseUrl8085;
  public baseUrl8085Employee = environment.baseUrl8082;

  constructor(private _HTTP: HttpClient) {}


 /*  public uploadSingleFile(file: File, data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('sdsd');
    formData.append('multipartFile', file);
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));
    console.log(formData.value);
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    return this._HTTP.post<any>(
      this.apiUrl + 'lic-transaction/uploadFile',
      formData,
      {
        
      });
  }
 */

  // Upload Multiple Files in LIC Transaction
 /*  public uploadMultipleFiles(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) { 
      formData.append('licDocuments', file);
    }
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
  
    return this._HTTP.post<any>(
      this.apiUrl + 'lic-transaction/uploadLICTransactionDocuments',
      formData,
      {

      });
  }
 */
/*....................GET innnMaster Summary............................... */
getpreviousEmployerDetailSummary() {
  return this._HTTP
    .get(this.apiUrl + 'previousEmployerMaster')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

/*...............https://dev.deliziahr.com:8085/hrms/v1/previousEmployerMaster GET ALL.....Master Services.........................*/
public getPreviousEmployerMaster(): Observable<any> {
  return this._HTTP.get(this.apiUrl + 'previousEmployerMaster').pipe(
    map((res: any) => {
      return res;
    })
  );
}


/*   ----------------master post save ------------------------ */
  public submitPreviousEmployerDetailData(document: File[], data: any): Observable<any> {
    console.log('in uploadMultipleFiles Service::', document);
    let formData: any = new FormData();    
    console.log('in uploadMultipleFiles Service::', data);
    for (const file of document) {
      formData.append('document', file);
    }
    // formData.append('licDocuments', document);
    formData.append('previousEmployerDetail', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'previousEmployerMaster',
      formData,
      {

      });
  }

 /*  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  } */
/* 
  postEightyCDeclarationInstitutions(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  } */

  /*....................Summary............................... */
   gethousePreviousEmployerSummary() {
    return this._HTTP
      .get(this.apiUrl + 'previousEmployerMaster/previousEmployerSummary')    
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


/* ...............Previous Employer Name Dropdorn..... Master..........*/
getPreviousEmpList() : Observable<any>  {
  return this._HTTP.get(this.baseUrl8085Employee + 'employee-previous-employment/2199')
  .pipe(map((res: any) => {
    return res;
  }));
}


  /* ----------------------Get---House Name Dropdown---https://dev.deliziahr.com:8085/hrms/v1/previousEmployerTransactionDetail/previousEmployerNameList------------------------------ */

  getPreviousEmployerNameList() {
    return this._HTTP
      .get(this.apiUrl + 'previousEmployerTransactionDetail/previousEmployerNameList')
      .pipe(            
        map((res: any) => {
          return res;
        })
      );
  }

  /*................All...https://dev.deliziahr.com:8085/hrms/v1/previousEmployerTransactionDetail/All....GET....reviousEmployerMaster...................... */
  public getTransactionFilterPreviousEmployerData(previousEmployer: String): Observable<any> {
    return this._HTTP
      .get(this.apiUrl + 'previousEmployerTransactionDetail/' + previousEmployer)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
/*   -----previousEmployerTransactionDetail/psid............. */
getTransactionByProofSubmissionId(proofSubmissionId: String) {
  return this._HTTP
    .get(this.apiUrl + 'previousEmployerTransactionDetail/psid/' + proofSubmissionId)
    .pipe(
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
    this.apiUrl + 'previousEmployerTransactionDetail/uploadPreviousEmployerTransactionDocuments',
    formData,
    {}
  );
}
/* ==========srry============= */
postEightyCDeclarationTransaction(data) {
  return this._HTTP.post(this.apiUrl + 'houseRentalTransaction', data).pipe(
    map((res: any) => {
      return res;
    })
  );
}

}

