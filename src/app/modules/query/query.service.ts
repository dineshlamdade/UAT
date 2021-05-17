import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

public apiUrl = environment.baseUrl8091;
public apiUrl1 = environment.baseUrl8083;
public apiUrl2 = environment.baseUrl8088;
constructor(private http : HttpClient ) { }

public getAll()
{
  return this.http.get<any>(this.apiUrl + 'QuestionAnswer' );
}
public addQuery(data)
{
  return this.http.post<any>(this.apiUrl  +'QuestionAnswer' ,data);
}
public updateQuery(data)
{
 return this.http.put<any>(this.apiUrl + 'QuestionAnswer' ,data);
}
public getModuleName()
{
  return this.http.get<any>(this.apiUrl1 + 'application-module/');
}
public getStandardKeywords()
{
  return this.http.get<any>(this.apiUrl + 'StandardKeyword/Global');
}
// .................................Query Type master api.....................................................................
public getAllSummaryData()
{
  return this.http.get<any>(this.apiUrl + 'QueryMaster');
}
public addQueryType(data)
{
  return this.http.post<any>(this.apiUrl  +'QueryMaster/AddnewData' ,data);
}
public updateQueryType(data)
{
 return this.http.put<any>(this.apiUrl + 'QueryMaster' ,data);
}
public getAllWorkflowMasters()
{
  return this.http.get<any>(this.apiUrl2 + 'workflowmaster-header/getAllWorkflowMasters');
}
public getAlldataById(id)
{
  return this.http.get<any>(this.apiUrl +'QueryMaster/getById/' + id);
}
// ............................ Not use Yet ..................................................................
// public getSubqueryPresent(id)
// {
//   return this.http.get<any>(this.apiUrl + 'getSubQueryPresent/getTenant/' +id)
// }
// public getAllQueryTypeMasterTenant()
// {
//   return this.http.get<any>(this.apiUrl + 'QueryMaster/getAllQueryTypeMasterTenant')
// }
// public getQueAns(id)
// {
//   return this.http.get<any>(this.apiUrl + 'QueryMaster/getQueAns/' +id)
// }
// public getSubQueAns(id)
// {
//   return this.http.get<any>(this.apiUrl + 'QueryMaster/getSubQueAns/' +id)
// }
// .........................admin-query-generation api..........................................................

public getAllQueryList()
{
  return this.http.get<any>(this.apiUrl + 'QueryGeneration');
}
public querySubQueryTypeQA()
{
  return this.http.get<any>(this.apiUrl + 'QueryGeneration/QuerySubQueryTypeQA');
}
public getById(id)
{
  return this.http.get<any>(this.apiUrl + 'QueryGeneration/' +id);
}
public addQueryGeneration(data)
{
  return this.http.get<any>(this.apiUrl + 'QueryGeneration',data);
}
public updateQueryGeneration(data)
{
  return this.http.put<any>(this.apiUrl + 'QueryGeneration',data);
}
public getDeleteById(id)
{
  return this.http.get<any>(this.apiUrl + 'QueryGeneration/' +id);
}
}
