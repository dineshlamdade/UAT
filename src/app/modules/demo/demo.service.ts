import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const headers1 = new HttpHeaders({

  'X-TenantId': 'PaysquareDefault',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',

});

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public apiUrl = environment.baseUrl8091;
  public apiUrl1 = environment.baseUrl8083;
  public apiUrl2 = environment.baseUrl8088;
  public apiUrl3 = environment.baseUrl8082;

  constructor(private http : HttpClient ) { }

  getEmpMasterDetails(id): Observable<any>
{
  return this.http.get<any>(this.apiUrl3 + 'employee-fin-details/' +id);
}

public getBankMasterDetails(){
  return this.http.get<any>(this.apiUrl3 + 'employee-bank-info/employeeMasterId/2251');
}

getDataFromIFSC(bankIFSC) {

  return this.http.get(environment.baseUrl8082 + 'bank-master/data/' + bankIFSC, { headers: { 'X-TenantId': 'PaysquareDefault' } })

    .pipe(map((res: any) => {
      return res;
    }))
}

public getAllLoanType()
{
return this.http.get<any>(this.apiUrl + 'loan-Master/getAll');
}

// getTypeOfEstablishment() {
//   return this.http.get(environment.baseUrl8083 + 'companygroupdropdown-master/TypeOfEstablishment', { 'headers': headers1 })
//     .pipe(map((res: any) => {
//       return res;
//     }));
// }

getGroupCompanyDetails() {
  return this.http.get(environment.baseUrl8083 + 'group-company/details', { headers: { 'X-TenantId': 'PaysquareDefault' } })
    .pipe(map((res: any) => {
      return res;
    }));

}

getAllWorkflowMasters() {
  return this.http.get(this.apiUrl2 + 'workflowmaster-header/getAllWorkflowMasters')
    .pipe(map((res: any) => {
      return res;
    }));
}

}


