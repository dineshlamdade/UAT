import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
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
  return this.http.get<any>(this.apiUrl + '/QuestionAnswer' );
}
public addQuery(data)
{
  return this.http.post<any>(this.apiUrl  +'/QuestionAnswer' ,data);
}
public updateQuery(data)
{
 return this.http.put<any>(this.apiUrl + '/QuestionAnswer' ,data);
}
public getModuleName()
{
  return this.http.get<any>(this.apiUrl1 + 'application-module/');
}
// .................................Query Type master api.....................................................................
public getAllQueryType(id)
{
  return this.http.get<any>(this.apiUrl + 'QueryMaster/getNew/' + id);
}
public addQueryType(data)
{
  return this.http.post<any>(this.apiUrl  +'/QueryMaster/AddnewData' ,data);
}
public updateQueryType(data)
{
 return this.http.put<any>(this.apiUrl + '/QueryMaster' ,data);
}
public getAllWorkflowMasters()
{
  return this.http.get<any>(this.apiUrl2 + 'workflowmaster-header/getAllWorkflowMasters')
}
}
