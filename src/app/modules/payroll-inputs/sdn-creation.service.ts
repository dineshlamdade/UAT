import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdnCreationService {
  url = environment.baseUrl8083;
  url1 = environment.baseUrl8084
  constructor(private HttpClient: HttpClient) { 

  }

  //  (Summery)
  sdmSummery(sdmMasterId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/`+ sdmMasterId);
  }

  // 1st tab api (Source)
  applicationModule() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `application-module/`);
  }

  // 1st tab api (Source)
  sourceTableList() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master`);
  }

  // 1st tab api (Source)
  fieldTypeList(sourceMasterId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master-field/`+ sourceMasterId);
  }

  // 1st tab api (Source)
  valuesList(sourceTableId,sourceFieldId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-master-field/value/` + sourceTableId+ `/field/` + sourceFieldId);
  }

  // 1st tab api (Source)
  saveSourceDerivedMatrix(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/` , data);
  }

  // 1st tab api (Source)
  SdmMasterDetails(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/sdm/` + sdmMasterId);
  }

  // 2nd tab api (Source Combination)
  sourceCombination(sourceFieldId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-combination/` + sourceFieldId);
  }

  // 2nd tab api (Source Combination)
  sourceCombinationUpdate(data):Observable<any>{
    return this.HttpClient.put<any>(this.url + `source-derived-matrix/source-combination/`,data);
  }

  // 3rd tab api (Derived)
  derivedType():Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/derived/types/`);
  }

  // 3rd tab api (Derived)
  derivedTablesFields():Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/derived/tables-fields/`);
  }

  // 3rd tab api (Derived)
  saveDerived(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/derived-master/`,data);
  }

  // 3rd tab api (Derived)
  KeywordMasterDetails():Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `KeywordMasterDetails`);
  }
}
