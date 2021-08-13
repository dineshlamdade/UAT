import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordserviceService {

  url = environment.baseUrl8084;
  url1 = environment.devbaseUrl8084;
  constructor(private HttpClient: HttpClient) { }


  // Keyword Summery
  KeywordMasterDetailsSummery() : Observable<any> {
    return this.HttpClient.get<any>(this.url + `KeywordMasterDetails`);
  }

  globalGetAl() : Observable<any> {
    return this.HttpClient.get<any>(this.url1 + `payrollhead-master/global-getAll`);
  }

  // Save Keyword data
  KeywordMasterDetails(data) : Observable<any> {
    return this.HttpClient.post<any>(this.url + `KeywordMasterDetails`,data);
  }

  // Keyword Edit data by id
  KeywordMasterDetailsGetById(data) : Observable<any> {
    return this.HttpClient.post<any>(this.url + `KeywordMasterDetails/GetById`,data);
  }

  // Keyword Delete Api
  KeywordMasterDetailsDelete(data) : Observable<any> {
    return this.HttpClient.delete<any>(this.url + `KeywordMasterDetails/DeleteKeywordById`,data);
  }

  //Keyword Update Api
  KeywordMasterDetailsUpdate(data) : Observable<any> {
    return this.HttpClient.put<any>(this.url + `KeywordMasterDetails/Updatekeyword`,data);
  }

  // Save Keyword data
  KeywordMasterDetailsGetKeywordbyKeypressInput(data) : Observable<any> {
    return this.HttpClient.post<any>(this.url + `KeywordMasterDetails/GetKeywordbyKeypressInput`,data);
  }
}
