import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
const headers = new Headers( {
  'Content-Type': 'application/json',
  'X-TenantId': 'PaysquareDefault',
} );

@Injectable( {
  providedIn: 'root',
} )
export class ComplianceMasterService {

  constructor( private _HTTP: HttpClient ) { }

  postComplianceMaster( data ) {
    return this._HTTP.post( environment.baseUrl8083 + 'compliance-master/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  putComplianceMaster( data ) {
    return this._HTTP.put( environment.baseUrl8083 + 'compliance-master/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // http://localhost:8083/hrms/v1/compliance-master/update-all
  putUpdateAllComlianceMaster( data ) {
    return this._HTTP.put( environment.baseUrl8083 + 'compliance-master/update-all', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );


  }
  deleteComplianceMasterDetail( Id: number ) {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.delete( environment.baseUrl8083 + 'compliance-master/update-details' + Id, { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  deleteAllComplianc( Id: number ) {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.put( environment.baseUrl8083 + 'compliance-master/delete/' + Id, { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // compliance-master/delete/{complianceMasterId}

  // http://localhost:8083/hrms/v1/compliance-master/delete/{complianceMasterId}

  deleteComplianceApplicability( id: any ) {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.put( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/delete/' + id, { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  // putComplianceApplicability(data) {
  //   return this._HTTP.put(environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }
  // /



  deleteComplianceMaster( Id: number ) {

    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.delete( environment.baseUrl8083 + 'compliance-master/' + Id, { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  //  return this._HTTP.put(environment.baseUrl8083 + 'compliance-master/update-details', data)
  putComplianceMasterUpdateDetails( data ) {
    return this._HTTP.put( environment.baseUrl8083 + 'compliance-master/update-details', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }



  postComplianceApplicability( data ) {
    return this._HTTP.post( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  putComplianceApplicability( data ) {
    return this._HTTP.put( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //   getComplianceApplicabilityDetails() {
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set('X-TenantId', 'PaysquareDefault');
  //   return this._HTTP.get(environment.baseUrl8083 + 'compliance-applicability/details', { headers: headers })
  //  // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/compliance-applicability/details',{'headers': headers})
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }

  getListOfCityFromTheState( stateName: any ) {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.get( environment.baseUrl8082 + '/location-information/city/' + stateName, { headers: { 'X-TenantId': 'PaysquareGlobal' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getComplianceMasterDetails() {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.get( environment.baseUrl8083 + 'compliance-master/', { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // http://localhost:8086/hrms/v1/frequency-master/getAllActive
  getFrequencyMaster() {
    return this._HTTP.get( environment.baseUrl8086 + 'frequency-master/getAllActive' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  getAllOtherMasterDetails() {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.get( environment.baseUrl8083 + 'all-other-masters/details', { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getAllOtherMastersMappingDetails() {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );
    return this._HTTP.get( environment.baseUrl8083 + 'all-othermasters-mapping/details', { headers: headers } )
      // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/all-othermasters-mapping/details',{'headers': headers})
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getStates() {

    return this._HTTP.get( environment.baseUrl8082 + '/location-information/state/', { headers: { 'X-TenantId': 'PaysquareGlobal' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/Applicability Compliance/
  // after changing url
  /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/complianceApplicabilitySDMId
  /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/statutoryFrequencySDMId
  getDropDownValuesByApplicationModuleName_FieldName( fieldName: string ) {
    return this._HTTP.get( environment.baseUrl8083 + 'source-derived-matrix/derived-module-mapping/compliance/' + fieldName )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // http://localhost:8083/hrms/v1/complianceMaster-SDM-Mapping/

  getComplianceMasterSDMMapping() {
    return this._HTTP.get( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', { headers: { 'X-TenantId': 'PaysquareDefault', 'Content-Type': 'application/json' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  postComplianceMaste( data: any ) {
    return this._HTTP.post( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  putComplianceMasterSDMMapping( data: any ) {
    return this._HTTP.put( environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
}
