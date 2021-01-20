import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelHomeService {

  constructor(private _HTTP: HttpClient) { }
//   URL: http://localhost:8083/hrms/v1/excel-template-generation
// XTenantId:PaysquareDefault

postExcelTemplateGeneration(data) {
  const headers = new HttpHeaders()
  .set('X-TenantId', 'PaysquareDefault');


  return this._HTTP.post(environment.baseUrl8082 + '/excel-template/creation', data,{ 'headers': headers })
    .pipe(map((res: any) => {
      return res;
    }));
}


deleteExcelTemplate(templateMasterId) {
  const headers = new HttpHeaders()
  .set('X-TenantId', 'PaysquareDefault');

  return this._HTTP.delete(environment.baseUrl8082 + '/excel-template/templateMasterId/' + templateMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
    .pipe(map((res: any) => {
      return res;
    }));
}
// check below code for delete
// deleteEducationGridItem(deleteEducationId) {

//   return this.httpClient.delete(environment.baseUrl8082 + '/education-skill-details/education/' + deleteEducationId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
//     .pipe(map((res: any) => {
//       return res;
//     }))
// }
// i have hardcoded company id to 1 in .ts file
getAllExcelTemplate(companyId:number){
  return this._HTTP.get(environment.baseUrl8082 + '/excel-template/all/'+ companyId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
  .pipe(map((res: any) => {
    return res;
  }));
}
// http://localhost:8083/hrms/v1/excel-upload
// Key :file
// Value :excel file
postExcelUpload(data) {

  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.post(environment.baseUrl8082 + '/excel-upload', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
    .pipe(map((res: any) => {
      return res;
    }));
}
getExcelTableFields(){
  return this._HTTP.get(environment.baseUrl8082 + '/excel-template/getTableFields', { headers: { 'X-TenantId': 'PaysquareDefault' } })
  .pipe(map((res: any) => {
    return res;
  }));
}


}
