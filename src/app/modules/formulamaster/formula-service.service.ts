import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormulaServiceService {
  url = environment.baseUrl8084;
  constructor(private HttpClient: HttpClient) { }


// formula-master Summery
formulamasterSummery() : Observable<any> {
  return this.HttpClient.get<any>(this.url + `formula-master`);
}

formulamasterSave(data) : Observable<any> {
  return this.HttpClient.post<any>(this.url + `formula-master`,data);
}

UpdateFormula(data) : Observable<any> {
  return this.HttpClient.put<any>(this.url + `formula-master/UpdateFormula`,data);
}

EditByFormulaById(FormulaId) : Observable<any> {
  return this.HttpClient.post<any>(this.url + `formula-master/GetById?FormulaId=`+ FormulaId,'');
}

DeleteById(FormulaId) : Observable<any> {
  return this.HttpClient.delete<any>(this.url + `formula-master/DeleteById?FormulaId=`+ FormulaId);
}

GetByFormulaName(formulaName) : Observable<any> {
  return this.HttpClient.post<any>(this.url + `formula-master/GetByFormulaName?formulaName=`+ formulaName,'');
}


getFormulaAllData():Observable<any>{
  return this.HttpClient.get<any>(this.url + `KeywordMasterDetails`);
}


}
