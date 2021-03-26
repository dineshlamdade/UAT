import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReimbursementMasterService {
apiUrl = environment.baseUrl8089;
reimbursementForm: any;

  constructor(private http:HttpClient) { }

getReimbursementHeadType(){
  return this.http.get(this.apiUrl + 'head-master/get-all-head-earning-reimbursment')
  .pipe(map((response:any)=>{
    return response;
  }));
}

getReimbursementAllAttributes(rembHeadId){
  return this.http.get(this.apiUrl + "reimbursement-attribute-master-company/get-attributes/" + rembHeadId)
  .pipe(map((response:any)=>{
    return response;
  }))
}

getReimbursementAllFrequency(){
  return this.http.get(this.apiUrl + "frequency-master/get-frequnecy")
  .pipe(map((response:any)=>{
    return response;
  }))
}
getRegisterTemplateFields(){
  return this.http.get(this.apiUrl + 'registration-template/get-all-Templates')
  .pipe(map((response:any)=>{
    return response;
  }));
}
getClaimTemplateFields(){
  return this.http.get(this.apiUrl + 'claim-template/get-all-claim-Templates')
  .pipe(map((response:any)=>{
    return response;
  }));
}
getSummaryTemplateFields(){
  return this.http.get(this.apiUrl + 'summary-template/get-all-Templates')
  .pipe(map((response:any)=>{
    return response;
  }));
}
getDeclarationTemplateFields(){
  return this.http.get(this.apiUrl + 'declaration-message-company/get-all_declaration_template')
  .pipe(map((response:any)=>{
    return response;
  }));
}

setReimbursementSubmitData(data) {
  this.reimbursementForm = data;
}

getReimbursementSubmitData() {
  return this.reimbursementForm;
}

postReimbursementSubmitData(data) {
  return this.http.post(this.apiUrl + 'reimbursement-general-setting/save-reimbursement-setting',data)
    .pipe(map((res: any) => {
      return res;
    }));
}
}
