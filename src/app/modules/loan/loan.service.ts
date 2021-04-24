import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

public apiUrl = environment.baseUrl8087;
public apiUrl1 = environment.baseUrl8088;
constructor(private http : HttpClient) { }
// .....................loan application Api....................................................................
public getAll()
{
return this.http.get<any>(this.apiUrl + 'loanApplication/getAll');
}

public addLoan(data)
{
  return this.http.post<any>(this.apiUrl  +'loanApplication/add',data);
}
public updateLoan(data)
{
 return this.http.put<any>(this.apiUrl + 'loanApplication/update',data);
}
public getAllLoanType()
{
return this.http.get<any>(this.apiUrl + 'loan-Master/getAll');
}

public allScheduleData(data)
{
  return this.http.post<any>(this.apiUrl  +'loan-Schedule/addSchedule',data);
}
public getallScheduleData(id)
{
  return this.http.get<any>(this.apiUrl  +'loan-Schedule/getByTempLoanMasterId/'+id);
}
public getGuarantorData(id)
{
  return this.http.get<any>(this.apiUrl  +'employee-Master/getByEmployeeCode/'+id);
}
public deleteLoanScheduleByID(id)
{
  return this.http.delete<any>(this.apiUrl  +'/loan-Schedule/deleteByTempLoanMasterId/'+id);
}
// .........................Summary Page Api................................................................
public getApproverDetails()
{
  return this.http.get<any>(this.apiUrl1 + '/workflowMaster-report/approverDetails')

}
}
