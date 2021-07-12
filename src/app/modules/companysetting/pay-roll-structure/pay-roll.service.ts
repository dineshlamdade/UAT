import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayRollService {

  constructor(private _HTTP : HttpClient) { }

  //Get Group Drop Down API
  getAllGroupId(){
    return this._HTTP.get(environment.baseUrl8084 + 'companyGroupMaster').pipe (map ((res : any) => {
      return res;
    }))
  }

  //Get PHG In Table API
  getAllPHGGroup(){
    return this._HTTP.get(environment.baseUrl8084 + 'headGroup/getAllGlobalHeadGroupCascading')
    .pipe (map (( res : any ) => {
      return res;
    }))
  }

  //Post Data
  postAllPHG( data): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'headGroup/phgCascading', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

//  Assign E/D Heads API

//Get All Assign Heads
getAllEDHeadsGroup(){
  return this._HTTP.get(environment.baseUrl8084 + 'payrollhead-master/global-getAll')
  .pipe (map (( res : any ) => {
    return res;
  }))
}

// headGroup/phgCommonHeads

//Post Assign ED Heads
postAllAssignEDHeads( data): Observable<number | {}> {

  return this._HTTP.post( environment.baseUrl8084 + 'headGroup/phgCommonHeads', data )
    .pipe( map( ( res: any ) => {
      return res;
    } ) );
}


}
