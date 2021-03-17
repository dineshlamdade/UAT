import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public apiUrl = environment.baseUrl8085;
  constructor(private http: HttpClient) {
  }

  public uploadSingleFile(file: File, data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('sdsd');
    formData.append('multipartFile', file);
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));
    console.log(formData.value);
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    return this.http.post<any>(
      this.apiUrl + 'lic-transaction/uploadFile',
      formData,
      {
        // reportProgress: true,
        // observe: 'events'
      });
  }

  // Upload Multiple Files in LIC Transaction
  public uploadMultipleFiles(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('licDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('licTransactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this.http.post<any>(
      this.apiUrl + 'lic-transaction/uploadLICTransactionDocuments',
      formData,
      {

      });
  }


  public uploadMultipleMasterFiles(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('licDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('licMasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this.http.post<any>(
      this.apiUrl + 'licmaster-detail',
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
