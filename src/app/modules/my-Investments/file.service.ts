import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  uploadSingleFile(file: File,data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('sdsd');
    formData.append('multipartFile', file);
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));
    //formData.append('licTransactionIDs', data.licTransactionIDs);
    // formData.append('receiptNumber', data.receiptNumber);
    // formData.append('receiptAmount', data.receiptAmount);
    // formData.append('receiptDate', data.receiptDate);
    //console.log(JSON.stringify(formData));
    console.log(formData.value);
    formData.forEach((value,key) => {
      console.log(key," ",value)
    });
    return this.http.post<any>(
      'http://localhost:8085/hrms/v1/lic-transaction/uploadFile',
      formData,
      {
        // reportProgress: true,
        // observe: 'events'
      });
  }

  // Upload Multiple Files in LIC Transaction
  uploadMultipleFiles(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('licDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this.http.post<any>(
      'http://localhost:8085/hrms/v1/lic-transaction/uploadLICTransactionDocuments',
      formData,
      {

      });
  }

  uploadMultipleMasterFiles(files: File[], data: any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('licDocuments', file);
    }
    //formData.append('licDocuments', files);
    formData.append('licMasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this.http.post<any>(
      'http://localhost:8085/hrms/v1/licmaster-detail',
      formData,
      {

      });
  }

  // Fetches the names of files to be displayed in the downloads list.
  fetchFileNames() {
    return this.http
      .get<string[]>('http://localhost:8080/get');
  }

   // Fetches the file names to display in list.
  //  fetchFileNames() {
  //   this.fileService.fetchFileNames().subscribe(filenames => {
  //     this.fileNames = filenames;
  //   });
  // }

  // Downloads the selected fileName from backend server.
  downloadFile(fileName: string) {
    window.location.href = 'http://localhost:8080/downloadFile/' + fileName;
  }
}
