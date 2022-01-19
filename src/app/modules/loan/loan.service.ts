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
  return this.HttpClient.post<any>(this.apiUrl  +'loanDisbursementPayment/loanDisbursementUpload',data);
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
  // return this.HttpClient.post<any>(this.apiUrl  +'loanApplication/add',data);
  return this.HttpClient.post<any>(this.apiUrl  +'loanApplication/loanApplicationUpload',data);
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
  return this.HttpClient.delete<any>(this.apiUrl  +'loan-Schedule/deleteByTempLoanMasterId/'+id);
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
getLoanDetails(loanType,employeeMasterId): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getByLoanType/'+ loanType +'/'+ employeeMasterId);
}

public getBankMasterDetails(){
  return this.HttpClient.get<any>(this.apiUrl3 + 'employee-bank-info/employeeMasterId/2251');
}

// public getCompanyBankMasterDetails(){
//   return this.HttpClient.get<any>(this.apiUrl2 + 'company-bankmaster-mapping/details/');
// }
public getCompanyBankMasterDetails(id){
  return this.HttpClient.get<any>(this.apiUrl2 + 'company-bankmaster-mapping/mapping/' + id);
}

 //get all Loan summary
 getAllLoanSummary() {

  return this.HttpClient.get( this.apiUrl + 'loanApplication/getAll' )
    .pipe( map( ( res: any ) => {
      return res;
    } ) );
}
// ..............................................new api loan application..............................................
getLoanApplicationSummary(id): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getByEmployeeId/' +id);
}

public postApproverDetails(data)
{
return this.HttpClient.post<any>(this.apiUrl1 + 'workflowMaster-report/approverDetails' , data);
}

loanDataByType(type):Observable<any>{
  return this.HttpClient.get<any>(this.apiUrl1 + 'loanApplication/getByLoanType/'+type);

}
getByLoanMasterId(id){
  return this.HttpClient.get<any>(this.apiUrl + 'loan-Master/getByLoanMasterId/' +id);

}

getLoanDataByEmployee(empId,payrollId,loanMasterId){
  return this.HttpClient.get<any>(this.apiUrl + 'loan-Master/getByLoansdm/' +empId+'/'+payrollId+'/'+loanMasterId);
}
getLoanTransaction(id): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getAllTransaction/' +id);
}
getDisbursementData(id): Observable<any>{
  return this.HttpClient.get<any>(this.apiUrl + 'loanDisbursementPayment/getDisbursementAmount/' +id)
}

updateDisbursementReq(data)
{
  return this.HttpClient.put<any>(this.apiUrl + 'loanDisbursementPayment/employeeUpdate', data)
}
getByIdDisbursementReq(id)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanDisbursementPayment/getLoanDisbursementPaymentDetailsId/' + id)
}
// ........................loan Approval...........................................................................
// ..............................adhoc............................................................
getTrasactionType(trasactionType)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getAllDisbursement/' + trasactionType)
}
updateAdhocForm(data){
  return this.HttpClient.put<any>(this.apiUrl + 'loanAdhocPayment/employeeUpdate' ,data)
}
getByIdAdhocForm(id)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanAdhocPayment/getAdhocPaymentDetailsId/' + id)

}
getAdhocBalance(currentDate,id): Observable<any>
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanSettlementPayment/getData/' + currentDate + '/' + id)
}
// ....................................reschedule ..................................................
getReschduleloanBalance(currentDate,id)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanMaster-RescheduleDetails/getData/' + currentDate + '/' + id)

}
updateReschduleForm(data)
{
  return this.HttpClient.put<any>(this.apiUrl + 'loanMaster-RescheduleDetails/Update' ,data)

}
getByIdReschduleForm(id)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanMaster-RescheduleDetails/getLoanRescheduleRequestDetailsId/' + id)
}
// ............................................settelment.........................................
updateSettelmentData(data){
return this.HttpClient.put<any>(this.apiUrl + 'loanSettlementPayment/Update',data)
}

getByIdSettelmentForm(id){
  return this.HttpClient.get<any>(this.apiUrl + 'loanSettlementPayment/getLoanSettlementPaymentDetailsId/' +id)
}
getAllDataForLoanApprovalSummary()
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getAllLoanTransaction')
}
// .................................approval summary api pop up............................................
getLoanHistory(id){
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getEmployeeLoanTransactionHistory/' + id)
}
getDocumentForView(proofSubmissionId)
{
  return this.HttpClient.get<any>(this.apiUrl + 'loanApplication/getProofSubmissionId/' + proofSubmissionId )
}
// ........................................loan application approval api.........................................
postLoanApproval(data)
{
  return this.HttpClient.post<any>(this.apiUrl + 'loanApplication/loanApplicationApprove' , data)
}
// ..........................................disbursment ofc use..........................................
disbursmentPutOfcUse(data)
{
  return this.HttpClient.put<any>(this.apiUrl + 'loanDisbursementPayment/update' ,data)
}
// ...........................................adhoc ofc use...................................................
adhocPutOfcUse(data){
 return this.HttpClient.put<any>(this.apiUrl + 'loanAdhocPayment/update' , data)
}
// ..........................................reschedule ofc use..........................................

reschedulePutOfcUse(data)
{
  return this.HttpClient.put<any>(this.apiUrl + 'loanMaster-RescheduleDetails/Update' ,data)
}
// ..........................................settelment ofc use..........................................
settelmentPutOfcUse(data)
{
  return this.HttpClient.put<any>(this.apiUrl + 'loanSettlementPayment/Update' ,data)
}
// .........................................for multiple emp Selection...........................
postMultipleEmpSelectionForLoanApproval(data){
  return this.HttpClient.post<any>(this.apiUrl + 'loanApplication/loanApplicationsApprove' , data)
}
// ........................................loan Remark api..........................................
loanRemark(data){
 return this.HttpClient.post<any>(this.apiUrl + 'loanMaster-Remark/add' ,data )
}
}
