import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

public apiUrl = environment.baseUrl8087;
public apiUrl1 = environment.baseUrl8088;
public apiUrl2 = environment.baseUrl8083;
public apiUrl3 = environment.baseUrl8082;

constructor(private HttpClient : HttpClient) { }

// .....................loan application Api....................................................................


/**  Disburse Payment save data */
saveDisburseData(data):Observable<any>{ 
  return this.HttpClient.post<any>(this.apiUrl  +'loanDisbursementPayment/add',data);
}

/**  adhoc save data */
saveAdhocData(data):Observable<any>{ 
  return this.HttpClient.post<any>(this.apiUrl  +'loanAdhocPayment/add',data);
}

/**  reschedule save data */
saveRescheduleData(data):Observable<any>{ 
  return this.HttpClient.post<any>(this.apiUrl  +'loanMaster-RescheduleDetails/add',data);
}

saveSettlementData(data):Observable<any>{
  return this.HttpClient.post<any>(this.apiUrl +'loanSettlementPayment/add',data);
}



updateLoan(data): Observable<any> {
  return this.HttpClient.put<any>(this.apiUrl + 'loanApplication/update',data);
}

public getAll()
{
return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getAll');
}

public addLoan(data)
{
  return this.HttpClient.post<any>(this.apiUrl  +'loanApplication/add',data);
}

public getAllLoanType()
{
return this.HttpClient.get<any>(this.apiUrl + 'loan-Master/getAll');
}

public allScheduleData(data)
{
  return this.HttpClient.post<any>(this.apiUrl  +'loan-Schedule/addSchedule',data);
}
public getallScheduleData(id)
{
  return this.HttpClient.get<any>(this.apiUrl  +'loan-Schedule/getByTempLoanMasterId/'+id);
}
public getGuarantorData(id)
{
  return this.HttpClient.get<any>(this.apiUrl  +'employee-Master/getByEmployeeCode/'+id);
}
public deleteLoanScheduleByID(id)
{
  return this.HttpClient.delete<any>(this.apiUrl  +'/loan-Schedule/deleteByTempLoanMasterId/'+id);
}
// .........................Summary Page Api................................................................
public getApproverDetails()
{
  return this.HttpClient.get<any>(this.apiUrl1 + '/workflowMaster-report/approverDetails')

}
// .........................Summary Page Employee  Api......................

getEmpMasterDetails(id): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl3 + 'employee-fin-details/' +id);
}

// getEmpBankDetails(id): Observable<any>
// {
//   return this.HttpClient.get<any>(this.apiUrl3 + 'employee-bank-info/employeeMasterId/' +id);
// }
getLoanDetails(id): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getByLoanType/Car Loan',id);
}

public getBankMasterDetails(){
  return this.HttpClient.get<any>(this.apiUrl3 + 'employee-bank-info/employeeMasterId/2251');
}

public getCompanyBankMasterDetails(){
  return this.HttpClient.get<any>(this.apiUrl3 + 'company-bankmaster-mapping/details/');
}

 //get all Loan summary
 getAllLoanSummary() {

  return this.HttpClient.get( this.apiUrl + 'loanApplication/getAll' )
    .pipe( map( ( res: any ) => {
      return res;
    } ) );
}

}
