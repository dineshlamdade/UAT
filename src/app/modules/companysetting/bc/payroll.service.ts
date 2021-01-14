import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { saveBusinessYear,saveCycleDefinition ,saveCycleCreation} from './payroll.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class payroll {
  // url = 'http://localhost:8083/hrms/v1/';
      url = 'http://deliziahruat.paysquare.com:8086/hrms/v1/';

  constructor(private _HTTP: HttpClient) { }

  //get all frequency list
  getFrequency() {
    debugger
    return this._HTTP.get(this.url + 'frequency-master')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  //get all businessyearlist
  getAllBusinessYear() {
    debugger
    return this._HTTP.get(this.url + 'business-year')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  //get BusinessYearById
  GetBusinessYearById(id: number) {//: Observable<saveBusinessYear | {}> {
    debugger
    return this._HTTP.get(this.url + 'business-year/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete BusinessYear
  DeleteBusinessYearById(id: number) {
    return this._HTTP.delete(this.url + 'business-year/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new BusinessYear
  AddBusinessYear(data: saveBusinessYear): Observable<number | {}> {
    debugger
    return this._HTTP.post(this.url + 'business-year', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //update BusinessYear
  UpdateBusinessYear(id: number, data: saveBusinessYear): Observable<number | {}> {
    debugger
    return this._HTTP.put(this.url + 'business-year/update/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CYCLE DEFINITION

//get all cycle-definition
  getAllCycleDefinition() {
    debugger
    return this._HTTP.get(this.url + 'business-cycle-definition')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all service-code
  getAllServicesName() {
    debugger
    return this._HTTP.get(this.url + 'service-code')
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //get cycle-definition ById
    GetCycleDefinitionById(id: number) {//: Observable<saveBusinessYear | {}> {
      debugger
      return this._HTTP.get(this.url + 'business-cycle-definition/' + id)
        .pipe(map((res: any) => {
          return res;
        }));
    }

   //delete cycle-definition
   DeleteCycleDefinitionById(id: number) {
    return this._HTTP.delete(this.url + 'business-cycle-definition/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //add new cycle-definition
    AddCycleDefinition(data: saveCycleDefinition): Observable<number | {}> {
      debugger
      return this._HTTP.post(this.url + 'business-cycle-definition',data)
        .pipe(map((res: any) => {
          return res;
        }));
    }

    //update cycle-definition
    UpdateCycleDefinition(id: number, data: saveCycleDefinition): Observable<number | {}> {
      debugger
      return this._HTTP.put(this.url + 'business-cycle-definition/update/' + id, data)
        .pipe(map((res: any) => {
          return res;
        }));
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CYCLE Creation

//get all cycle-Creation
getAllCycleCreation() {
  debugger
  return this._HTTP.get(this.url + 'business-cycle')
    .pipe(map((res: any) => {
      return res;
    }));
  }

     //delete cycle-Creation by id
     DeleteCycleCreationById(businessCycleDefinitionId:number,BusinessYear:string) {
      return this._HTTP.delete(this.url + 'business-cycle/cycles/' + businessCycleDefinitionId +'/'+BusinessYear)
        .pipe(map((res: any) => {
          return res;
        }));
    }

       //get cycle-Creation by id
      getCycleCreationById(businessCycleDefinitionId:number,BusinessYear:string) {
        return this._HTTP.get(this.url + 'business-cycle/cycle-definition/' + businessCycleDefinitionId +'/'+BusinessYear)
          .pipe(map((res: any) => {
            return res;
          }));
      }

      //add new cycle-Creation
    AddCycleCreation(data: saveCycleCreation): Observable<number | {}> {
      debugger
      return this._HTTP.post(this.url + 'business-cycle',data)
        .pipe(map((res: any) => {
          return res;
        }));
    }

        //delete Preview Cycle Discard
        DeletePreviewCycleDiscard(businessCycleDefinitionId:number,BusinessYear:string) {
          debugger
          return this._HTTP.delete(this.url + 'business-cycle/cycles/' + businessCycleDefinitionId +'/'+BusinessYear)
            .pipe(map((res: any) => {
              return res;
            }));
        }

        //Edit toDate of cycle-Creation
        EdittoDate(businessCycleDefinitionId:number,BusinessYear:string,data:any) : Observable<number | {}> {
          debugger
          return this._HTTP.put(this.url + 'business-cycle/update/' + businessCycleDefinitionId +'/'+BusinessYear,data)
            .pipe(map((res: any) => {
              return res;
            }));
        }

        //ForcetoYearEnd of cycle-Creation
        ForcetoYearEnd(businessCycleDefinitionId:number,BusinessYear:string,data:any) : Observable<number | {}> {
          debugger
          return this._HTTP.put(this.url + 'business-cycle/force-end/' + businessCycleDefinitionId +'/'+BusinessYear,data)
            .pipe(map((res: any) => {
              return res;
            }));
        }

}
