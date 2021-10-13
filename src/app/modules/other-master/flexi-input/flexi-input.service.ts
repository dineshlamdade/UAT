import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlexiInputService {
  constructor(private _HTTP: HttpClient, private http: HttpClient) {}
  // http://localhost:8084/hrms/v1/SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId=161

  //Get APIs Lock Area
  getAllSectionTableList() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'FlexiSectionMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Get Flexi section name
  getOwnFlexiDropDownList() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP
      .get(
        environment.baseUrl8084 +
        'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiSectionMaster'

      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // 'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiSectionMaster'
  //Get derived Name Cycle Name
  getDerivedNameList(name) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP
      .get(
        environment.baseUrl8084 +
          'SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId=' +
          name
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId

  postSectionMaster(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this.http
      .post(environment.baseUrl8084 + 'FlexiSectionMaster', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  putMaster(data) {
    return this._HTTP.put( environment.baseUrl8084 + 'FlexiSectionMaster/UpdateFLexiSectionMaster', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  // SectionMasterEditByID(data) {
  //   return this._HTTP.get( environment.baseUrl8084 + 'FlexiSectionMaster/GetById?flexiSectionMasterId=', data )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }


    //get HeadCreationById by global
    sectionMasterEditByID( id: any ) {
      return this._HTTP.get( environment.baseUrl8084 + 'FlexiSectionMaster/GetById?flexiSectionMasterId=' + id )
        .pipe( map( ( res: any ) => {
          return res;
        } ) );
    }


  //Delete


  // deleteFlexiMaster( data ) {
  //   return this._HTTP.put( environment.baseUrl8083 + 'FlexiSectionMaster/UpdateFLexiSectionMaster', data )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  delete12( id: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8084 + 'FlexiSectionMaster/DeleteById?flexiSectionMasterId=' + id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }



}
