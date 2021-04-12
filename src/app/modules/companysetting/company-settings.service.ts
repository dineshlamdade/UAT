import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { SaveAttributeCreation, SaveAttributeSelection, SaveBusinessYear, SaveCycleDefinition, SaveHeadCreation, SavePHG, UpdateflagCycleCreation } from './model/business-cycle-model';

@Injectable( {
  providedIn: 'root'
} )
export class CompanySettingsService {
  constructor( private _HTTP: HttpClient ) { }

  getAllPayrollheadAttributeMaster() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  // getAllGlobalAttributeMastter() {

  //   return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllGlobalAttributeMaster' )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }
  // get data from  [GlobalAttributeMaster]
  getAllGlobalAttributeMaster() {
    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllGlobalAttributeMaster' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getAttributeGroup() {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getByHeadMasterByNature( earningordeduction: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/headType/' + earningordeduction )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // getAll GlobalAttributeMaster
  getAllGlobalAttributeCreation() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllGlobalAttributeMaster' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  getAllAttributeCreation() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  GetAttributeCreationById( id: number ) {
    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAttMaster/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // added at globally [GlobalAttributeMaster]
  AddAttributeCreation( data: SaveAttributeCreation ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'payrollhead-attribute-master', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // added at globally  GlobalAttributeMaster GlobalAttributeOption
  UpdateAttributeCreation( data: SaveAttributeCreation ) {

    return this._HTTP.put( environment.baseUrl8084 + 'payrollhead-attribute-master', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // added at globally  GlobalAttributeMaster GlobalAttributeOption

  getAllPayrollHeadAttributeMaster() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllAttributeSelection() {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  GetAttributeSelectionById( id: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/global/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  UpdateAttributeGroup( id: number, data: SaveAttributeSelection ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8084 + 'attribute-group/updateById/' + id, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  GetAttributeOptionListByGroup( groupname: string ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getGroupByName/' + groupname )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // this willl save into [AttributeGroupDefinition] of group level
  AddAttributeSelection( data: SaveAttributeSelection ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'attribute-group', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  DeleteAttributeSelection( id: number ) {
    return this._HTTP.delete( environment.baseUrl8084 + 'attribute-group/delete/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // end of Attribute-Selection



  //get all frequency lists
  getActiveFrequency() {

    return this._HTTP.get( environment.baseUrl8086 + 'frequency-master/getAllActive' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  //get all businessyearlist
  getAllBusinessYear() {

    return this._HTTP.get( environment.baseUrl8086 + 'business-year/getAll-Active-bussiness-year' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  //get BusinessYearById'
  // http://localhost:8086/hrms/v1/business-year/27
  GetBusinessYearById( id: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8086 + 'business-year/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //delete BusinessYear
  //business-year/soft-delete/10
  DeleteBusinessYearById( id: number ) {
    return this._HTTP.delete( environment.baseUrl8086 + 'business-year/soft-delete/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //add new BusinessYear
  AddBusinessYear( data: SaveBusinessYear ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8086 + 'business-year', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //update BusinessYear
  UpdateBusinessYear( data: SaveBusinessYear ) {

    return this._HTTP.put( environment.baseUrl8086 + 'business-year/update', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CYCLE DEFINITION

  //get all cycle-definition

  // http://localhost:8086/hrms/v1/business-cycle-definition/getAllActiveNonActive
  getAllCycleDefinition() {

    return this._HTTP.get( environment.baseUrl8086 + 'business-cycle-definition/getAllActive' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  addBusiness_cycle_cycle_definition( data ) {

    return this._HTTP.post( environment.baseUrl8086 + 'business-cycle/cycle-definition', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllCycleCreation() {

    return this._HTTP.get( environment.baseUrl8086 + 'business-cycle/cycle-definition-getAll' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get all service-code
  getAllServicesName() {

    return this._HTTP.get( environment.baseUrl8086 + 'service-code' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get cycle-definition ById
  //  /business-cycle-definition/1
  GetCycleDefinitionById( id: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8086 + 'business-cycle-definition/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //delete cycle-definition
  DeleteCycleDefinitionById( id: number ) {
    return this._HTTP.delete( environment.baseUrl8086 + 'business-cycle-definition/delete/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //add new cycle-definition
  AddCycleDefinition( data: SaveCycleDefinition ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8086 + 'business-cycle-definition', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //update cycle-definition
  UpdateCycleDefinition( data: any ) {

    return this._HTTP.put( environment.baseUrl8086 + 'business-cycle-definition/update', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get all cycle-Creation
  // getAllCycleCreation() {

  //   return this._HTTP.get(environment.baseUrl8086 + 'business-cycle-definition/getAllActiveNonActive')
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }

  //delete cycle-Creation by id
  DeleteCycleCreationById( businessCycleDefinitionId: number, BusinessYear: string ) {
    return this._HTTP.delete( environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get cycle-Creation by id
  getCycleCreationById( businessCycleDefinitionId: number, BusinessYear: string ) {
    return this._HTTP.get( environment.baseUrl8086 + 'business-cycle/cycle-definition/' + businessCycleDefinitionId + '/' + BusinessYear )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //add new cycle-Creation
  AddCycleCreation( data: any ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8086 + 'business-cycle', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //delete Preview Cycle Discard
  DeletePreviewCycleDiscard( businessCycleDefinitionId: number, BusinessYear: string ) {

    return this._HTTP.delete( environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //Edit toDate of cycle-Creation
  EdittoDate( businessCycleDefinitionId: number, BusinessYear: string, data: any ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8086 + 'business-cycle/update/' + businessCycleDefinitionId + '/' + BusinessYear, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //ForcetoYearEnd of cycle-Creation
  ForcetoYearEnd( businessCycleDefinitionId: number, BusinessYear: string, data: any ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8086 + 'business-cycle/force-end/' + businessCycleDefinitionId + '/' + BusinessYear, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  // get All HeadCreation
  getAllHeadCreation() {

    return this._HTTP.get( environment.baseUrl8086 + 'head-creation/get' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get HeadCreationById
  GetHeadCreationById( id: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8086 + 'head-creation/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //add new BusinessYear
  AddHeadCreation( data: SaveHeadCreation ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8086 + 'head-creation', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // get All PayrollHeadGroup
  getAllPayrollHeadGroup() {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //delete Payroll Head Group
  DeletePayrollHeadGroup( id: number ) {
    return this._HTTP.delete( environment.baseUrl8084 + 'headGroup/delete/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }



  //add new PHG
  AddPayrollHeadGroup( data: SavePHG ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'headGroup', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get Attribute Selection By Id
  GetPHGById( id: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getPHGById/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //update BusinessYear
  UpdatePHGById( id: number, data: SavePHG ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8084 + 'headGroup/updateById/' + id, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //get Head table list on slection of copy form dropdown
  GetHeadListByPHGname( PHGname: string ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getPHGByName/' + PHGname )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //add attribute assignment
  AddAttributeAssignment( data: UpdateflagCycleCreation ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'payrollhead-attribute-mapping', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //Get AttributeOptionList By HeadGroupId
  GetAttributeOptionListByHeadGroupId( HeadGroupId: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAttributeMasterListByHeadGroupId/' + HeadGroupId )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //Get AttributeOptionList By HeadGroupId
  GetAttributeOptionListByHeadGroupIdGetById( HeadGroupId: number ) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-mapping/getByHeadGroupId/' + HeadGroupId )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // get formula for formula master
  getFromulaForFormulaMaster() {

    return this._HTTP.get( environment.baseUrl8084 + 'formula-master' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getSDMFormula() {

    return this._HTTP.get( environment.baseUrl8084 + 'companySDMForm' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //update attribute list by id
  UpdateattributeListById( data: UpdateflagCycleCreation ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8084 + 'payrollhead-attribute-mapping', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
}



