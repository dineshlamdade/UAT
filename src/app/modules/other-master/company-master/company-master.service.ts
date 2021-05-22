import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

const headers1 = new HttpHeaders( {

  'X-TenantId': 'PaysquareDefault',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',

} );


@Injectable( {
  providedIn: 'root'
} )
export class CompanyMasterService {

  constructor( private _HTTP: HttpClient ) { }

  getCountryCodes() {
    return this._HTTP.get( environment.baseUrl8082 + '/location-information/phone-code', )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAddressFromPIN( postalCode ) {
    return this._HTTP.get( environment.baseUrl8082 + '/pincode-details-check/' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) )
  }

  getLocationInformationOrCountryList() {
    return this._HTTP.get( environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) )
  }


  getTypeOfEstablishment() {
    return this._HTTP.get( environment.baseUrl8083 + 'companygroupdropdown-master/TypeOfEstablishment', { 'headers': headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getIndustryTypeMaster() {

    return this._HTTP.get( environment.baseUrl8083 + 'companygroupdropdown-master/industrytype', { 'headers': headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  postCompanyMaster( data ) {
    return this._HTTP.post( environment.baseUrl8083 + 'companymaster', data, { headers: { 'X-TenantId': 'PaysquareDefault' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getCompanyMasterDataById( id ) {
    return this._HTTP.get( environment.baseUrl8083 + 'companymaster/' + id, { 'headers': headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) )
  }

  getAllCompanyMasterData() {
    return this._HTTP.get( environment.baseUrl8083 + 'companymaster', { 'headers': headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getCurrencyList() {
    return this._HTTP.get( environment.baseUrl8082 + '/currency-information/symbol', { headers: headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) )
  }

  getLanguagesList() {
    return this._HTTP.get( environment.baseUrl8082 + '/language-information/name', { headers: { 'X-TenantId': 'PaysquareGlobal' } } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) )
  }

  getCompanyMasterById( id: any ) {
    return this._HTTP.get( environment.baseUrl8083 + 'companymaster/' + id, { 'headers': headers1 } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
}
