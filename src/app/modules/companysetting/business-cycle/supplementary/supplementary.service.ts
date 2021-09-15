import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
export class SupplementaryService{
    public apiUrl = environment.baseUrl8086;
    constructor(private http : HttpClient){}


    getAllCycleDefinition():Observable<any>{
        return this.http.get(this.apiUrl+`business-cycle-definition/getAllActiveNonActive`)
    }

    getCycleNameById(id):Observable<any>{
        return this.http.get(this.apiUrl+`business-cycle/cycle/`+id)
    }

      getByCycleLock(id):Observable<any>{
          return this.http.get(this.apiUrl+`business-cycle/lock-cycle/`+id);
      }


        /**get summary data */
        getSummaryData():Observable<any>{
            return this.http.get(this.apiUrl+`business-cycle/SuppCycle/`);
           // return this.http.get(this.apiUrl+`business-cycle/cycle-definition-getAll`);
        }

        saveSupplementaryCycle(data):Observable<any>{
            return this.http.post<any>(this.apiUrl+ `business-cycle/supplimentary`, data)
        }

        updateData(data):Observable<any>{
            return this.http.put(this.apiUrl+`business-cycle/supplimentary/`,data);

        }
        deleteData(id : number):Observable<any>{
            return this.http.delete<any>(this.apiUrl + `business-cycle/soft-delete/`+id)
        }
        getAdhocCycle():Observable<any>{
            return this.http.get(this.apiUrl+`business-cycle/AdhocCycle/`);
        }

}