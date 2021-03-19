import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PreviousEmployerService {
  public apiUrl = environment.apiBaseUrl;
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
/*....................Master Summary............................... */
getpreviousEmployerDetailSummary() {
  return this._HTTP
    .get(this.apiUrl + 'previousEmployer-detail')
    .pipe(
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
      formData.append('licDocuments', file);
    }
    // formData.append('licDocuments', document);
    formData.append('previousEmployerDetail', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'previousEmployer-detail',
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
      .get(this.apiUrl + 'previousEmployer-detail/previousEmployerSummary')    
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
/*....................Master Summary............................... */

  /* public submitPreviousEmployerDetailData(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('licDocuments', file);
    formData.append('previousEmployerDetail', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    return this._HTTP.post<any>(
      this.apiUrl + 'previousEmployer-detail',
      formData,
      {

      });
  }

} */