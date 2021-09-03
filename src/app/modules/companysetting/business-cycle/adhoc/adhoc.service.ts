import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
export class AdhocService{
    public apiUrl = environment.baseUrl8086;
    constructor(private http : HttpClient){}

    /**Fetch all cycle definition */
    getAllCycleDefinition():Observable<any>{
        return this.http.get(this.apiUrl+ `business-cycle-definition/getAllActiveNonActive`)
    }

    /**get cycle name by id */
    getCycleNameById(id):Observable<any>{
        return this.http.get(this.apiUrl+`business-cycle/cycle/`+id);

    }

    /**get adhoc cycle */
    getAdhocCycle():Observable<any>{
        return this.http.get(this.apiUrl+`business-cycle/AdhocCycle/`);
    }


    /**get active heads */
    getActiveHead():Observable<any>{
       // return this.http.get(this.apiUrl+`head-creation/getActive`);
        return this.http.get(this.apiUrl+`head-creation/oneTimeHead`);

    }

    /**get summary data */
    getSummaryData():Observable<any>{
        //return this.http.get(this.apiUrl+`business-cycle/cycle-definition-getAll`);
        return this.http.get(this.apiUrl+`business-cycle/AdhocCycle/`);
    }


    /**add adhoc cycle */
    saveAdhocCycle(data):Observable<any>{
        return this.http.post<any>(this.apiUrl+ `business-cycle/adhoc`, data)
    }

    /**Update data */
    updateData(data):Observable<any>{
        return this.http.put<any>(this.apiUrl+ `business-cycle/update/`, data);
    }

    deleteData(id : number):Observable<any>{
        return this.http.delete<any>(this.apiUrl + `business-cycle/soft-delete/`+id)
    }
}