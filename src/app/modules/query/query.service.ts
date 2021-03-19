import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

public apiUrl = environment.baseUrl8091;
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

}
