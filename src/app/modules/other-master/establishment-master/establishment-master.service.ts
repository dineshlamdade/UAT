import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
const headers = new Headers( {
  "Content-Type": "application/json",
  "X-TenantId": "PaysquareDefault"
} );

@Injectable( {
  providedIn: 'root'
} )
export class EstablishmentMasterService {

  constructor( private _HTTP: HttpClient ) { }
  public postapi=environment.baseUrl8083;

  // postEstablishmentMaster( data ) {
  //   console.log( data.regionMasterId );
  //   return this._HTTP.post( environment.baseUrl8083 + 'establishment-master/add-establishment', data )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }
  // public getStatutoryFreq(): Observable<any>{
  //   return this._HTTP.get<any>(this.apiUrl3 + 'frequency-master/getAllActive');
  // }

  postEstablishmentMaster( data ):Observable<any>{
    return this._HTTP.post<any>(this.postapi + 'establishment-master/add-establishment',data)
  }

  putEstablishmentMaster( data ) {
    return this._HTTP.put( environment.baseUrl8083 + 'establishment-master/update', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  getEstablishmentMasterDetails() {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );


    return this._HTTP.get( environment.baseUrl8083 + 'establishment-master/details', { 'headers': headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getRegionMasterDetails() {
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-TenantId', 'PaysquareDefault' );


    return this._HTTP.get( environment.baseUrl8083 + 'region-master/details', { 'headers': headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
}
