import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymenttrackingMasterService {

  public apiUrl = environment.baseUrl8092;
  public apiUrl1 = environment.baseUrl8083;
  public apiUrl2 = environment.baseUrl8088;
  public apiUrl3 = environment.baseUrl8084;
  constructor(private http : HttpClient) { }

  public getAll(){
    return this.http.get<any>(this.apiUrl + 'Payment-Tracking/getAll');
  }
  

  public getById(){
    return this.http.get<any>(this.apiUrl +'Payment-Tracking/getById/16');
  }

  public addPayment(data){
    return this.http.post<any>(this.apiUrl + 'Payment-Tracking/add',data);
  }

  public updatePayment(data){
    return this.http.put<any>(this.apiUrl + 'Payment-Tracking/update',data);
  }

  public getSummay(){
    return this.http.get<any>(this.apiUrl + 'Payment-Tracking/getSummary');
  }

  public deletePaymentById(){
    return this.http.delete<any>(this.apiUrl + 'Payment-Tracking/deleteSummary/88');
  }

  public getJobMaster(){
    return this.http.get<any>(this.apiUrl1 + 'job-master/');
  }
   
  public getJobMasterMapping(){
    return this.http.get<any>(this.apiUrl1 + 'job-master-mapping/master/jobMasterId')
  }

  public getModuleName()
{
  return this.http.get<any>(this.apiUrl1 + 'application-module/');
}


public getComplianceHead(){
  return this.http.get<any>(this.apiUrl1 + 'compliance-head/details');
}

public getComplianceMaster(){
  return this.http.get<any>(this.apiUrl1 + 'compliance-master/');
}

public getBankMasterDetails(){
  return this.http.get<any>(this.apiUrl1 + 'company-bankmaster-mapping/details');
}

public getWorkflowMaster(){
  return this.http.get<any>(this.apiUrl2 + 'workflowmaster-header/getAllWorkflowMasters');
}

public getGarnishmentMaster(){
  return this.http.get<any>(this.apiUrl3 + 'garnishment-master');
}
}
