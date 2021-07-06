import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

  export class EmployeesetService{
    public apiUrl = environment.baseUrl8084;
    constructor(private http : HttpClient){}

     /** Get Service list for employee set */
    getServiceList():Observable<any>{
        return this.http.get<any>(this.apiUrl+`EmployeeMaster/`);
    }

    /**Get by employee id */
    getByEmlpoyeeId(empId):Observable<any>{
      return this.http.get(this.apiUrl+ `EmployeeMaster/getByEmployeeId/`+empId)
    }

    /**get summary data */
    getSummaryData():Observable<any>{
      return this.http.get<any>(this.apiUrl+ `EmployeeMaster/SummaryData`);
    }
  }