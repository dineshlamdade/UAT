import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class AreasetService{
public apiUrl = environment.baseUrl8084;
  sweetalertWarning: any;
    constructor(private http : HttpClient){}

    /** Get Service list for area set */
    getServiceList():Observable<any>{
        return this.http.get<any>(this.apiUrl+`Areamaster/`);
    }
    
    /** Get Arealist by service */
    getByServiceName(serviceid):Observable<any>{
       return this.http.get<any>(this.apiUrl+ `Areamaster/getByServiceName/`+serviceid)
       // return this.http.get<any>(this.apiUrl+ `Areamaster/getAreaMastersById/`+serviceid)
      // return this.http.get<any>(this.apiUrl+ `Areamaster/ServiceMasterId/`+serviceid)

    }

    /**get Summary data */
    getSummaryData():Observable<any>{
       return this.http.get<any>(this.apiUrl+ `Areamaster/getAllAreaMasters`);
      // return this.http.get(this.apiUrl+`Areamaster/SummaryData`)
    }

    /**save areaset */
    saveAreaSet(data):Observable<any>{
         return this.http.post<any>(this.apiUrl+ `Areamaster/Add`, data);
    }

    /**update areaset */
    updateAreaSet(data):Observable<any>{
        return this.http.put<any>(this.apiUrl+ `Areamaster/Update`, data);
   }

   deleteData(id:number):Observable<any>{
     return this.http.delete<any>(this.apiUrl+`Areamaster/deleteById/`+id);
   }

}