import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdnCreationService {
  url = environment.baseUrl8083;
  constructor(private HttpClient: HttpClient) { 

  }

  applicationModule() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `application-module/`);
  }

  sourceTableList() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master`);
  }

  fieldTypeList(sourceMasterId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master-field/`+ sourceMasterId);
  }

  valuesList(sourceTableId,sourceFieldId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master-field/value/` + sourceTableId+ `/field/` + sourceFieldId);
  }
}
