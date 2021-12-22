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
  sdmSummery(companyGroupId) : Observable<any> {
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/summary/`+ companyGroupId);
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

  // 1st tab api (Source)
  SdmSourceUpdate(data):Observable<any>{
    return this.HttpClient.put<any>(this.url + `source-derived-matrix/`, data);
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

  // 3rd tab api (Derived) get values from table selection
  derivedTablesFieldsValue(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/derived/tables-fields/value/` ,data);
  }

  // 3rd tab api (Derived)
  saveDerived(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/derived-master/`,data);
  }

  // 3rd tab api (Derived)
  KeywordMasterDetails():Observable<any>{
    return this.HttpClient.get<any>(this.url1 + `formula-master`);
  }

  // 3rd tab api (Derived)
  deleteSourceDerive(sdmDerivedMasterId):Observable<any>{
    return this.HttpClient.delete<any>(this.url + `source-derived-matrix/derived-master/`+ sdmDerivedMasterId);
  }

  // 4th tab api (Matrix)
  derivedMaster(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/derived-master/`+ sdmMasterId);
  }

  // 4th tab api (Matrix)
  combinationMatrix(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/combination-matrix/`+ sdmMasterId);
  }

  // 4th tab api (Matrix)
  saveMatrix(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/combination-matrix/`,data);
  } 

  // 4th tab api (Matrix) table
  getMatrixData(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/combination-matrix/source-combination/`+ sdmMasterId);
  }  
  
  
  // 4th tab api (Matrix) table
  derivedFieldName(objectname,value):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/combination-matrix/derivedObjectName/`+objectname+`/derivedFieldName/`+value);
  }  

  //4th tab api (Matrix) History
  getHistory(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/combination-matrix/History`,data);  
  }

   // 4th tab api (Matrix) table
   activeSource(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/source-combination/activeSource/`+ sdmMasterId);
  } 


  filter(sdmMasterId):Observable<any>{
    return this.HttpClient.get<any>(this.url + `source-derived-matrix/combination-matrix/Filter/`+sdmMasterId);
  }


  SDMCombinationwithDerivedId(data):Observable<any>{
    return this.HttpClient.post<any>(this.url + `source-derived-matrix/combination-matrix/SDMCombinationwithDerivedId`,data);  
  }

  globalGetAl() : Observable<any> {
    return this.HttpClient.get<any>(this.url1 + `payrollhead-master/global-getAll`);
  }

  payrollheadmaster(data): Observable<any>{
    return this.HttpClient.post<any>(this.url1 + `payrollhead-master/headCategorywise`, data)
  }

}
