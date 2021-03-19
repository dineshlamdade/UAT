import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReimbursementMasterService {
apiUrl = environment.baseUrl8089;

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
}
