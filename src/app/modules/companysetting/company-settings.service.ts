import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { SaveAttributeCreation, SaveAttributeSelection, SaveBusinessYear, SaveCycleDefinition, SaveHeadCreation, SavePHG, SavePHGGlobal, UpdateflagCycleCreation } from './model/business-cycle-model';

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
  //  /attribute-group/global-getAll
  getAllGlobalAttributeMasterByGlobal() {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/global-getAll' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
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
  // this is getting value from global
  getByHeadMasterByNature( earningordeduction: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/globalHeadType/' + earningordeduction )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getByHeadMasterByNatureByGroup( earningordeduction: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/headType/' + earningordeduction )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // getAll GlobalAttributeMaster


  getAllGlobalAttributeCreation() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeMaster' )
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


  getAllAttributeSelectionByGlobal() {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/global-getAll' )
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
  //attribute-group/globalAttGroupById/23
  GetAttriubuteSelectionByIdGlobal( id: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/globalAttGroupById/' + id )
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
  UpdateAttributeGlobal( id: number, data: SaveAttributeSelection ): Observable<number | {}> {
    return this._HTTP.put( environment.baseUrl8084 + 'attribute-group/updateAttGroupDefById/' + id, data )
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

  GetAttributeOptionListByGlobal( phgName: string ) {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getGlobalPHGByName/' + phgName )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // get by global

  getHeadMasterGroupByPHG_GroupDefId( headGroupDefId: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getGlobalPHGById/' + headGroupDefId )
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

  // attribute-group/global-add
  // this willl save into [AttributeGroupDefinition] of group level
  AddAttributeSelectionGlobal( data: SaveAttributeSelection ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'attribute-group/global-add', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  AddAttributeSelection( data: SaveAttributeSelection ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'attribute-group', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  DeleteAttributeSelectionAtGlobal( id: number ) {
    return this._HTTP.delete( environment.baseUrl8084 + 'attribute-group/globalDelete/' + id )
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
  GetBusinessYearById( id: number ) {

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


  addBusiness_cycle_cycle_definition( data: any ) {

    return this._HTTP.post( environment.baseUrl8086 + 'business-cycle/cycle-definition', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // val1 val2 val3 val4
  postPayrollHeadAttributeMappingAddGlobal( data: any ) {
    return this._HTTP.post( environment.baseUrl8084 + 'payrollhead-attribute-mapping/addGlobal', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // payrollhead-attribute-mapping/newUpdatePHGAttributeValueRefFM
  // payrollhead-attribute-mapping/newUpdatePHGAttributeValueRefFM date spliting logic
  //payrollhead-attribute-mapping/updateGlobal // old update api
  putPayrollHeadAttributeMappingAddGlobal( data: any ) {
    return this._HTTP.put( environment.baseUrl8084 + 'payrollhead-attribute-mapping/updateGlobal', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  //http://localhost:8084/hrms/v1/payrollhead-attribute-mapping/getAllPayRollHeadGroupAttributeHistory/{headGroupId}/{AttributeGroupId} 555

  getAllPayRollHeadGroupAttributeHistory( headGroupId: number, AttributeGroupId: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAllPayRollHeadGroupAttributeHistory/' + headGroupId + '/' + AttributeGroupId )
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


  // get All HeadCreation from group old value was 86 and head-creation/get
  // below one is get data from global
  getAllHeadCreation() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-master/global-getAll' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllHeadCreationByGroup() {

    return this._HTTP.get( environment.baseUrl8086 + 'head-creation/get' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllActivePayrollHeadGroup() {
    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-mapping/getGlobal' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );


  }
  //get HeadCreationById by global
  GetHeadCreationById( id: any ) {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-master/global-get/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  GetHeadCreationByIdByGroup( id: number ) {

    return this._HTTP.get( environment.baseUrl8086 + 'head-creation/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //add payrollhead-master/global-add old one was  'head-creation' and port 8086

  AddHeadCreationForGroup( data: SaveHeadCreation ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8086 + 'head-creation', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // this is for global
  AddHeadCreation( data: SaveHeadCreation ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'payrollhead-master/global-add', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // get All PayrollHeadGroup
  // headGroup/getAllGlobalHeadGroup
  getAllPayrollHeadGroupAtGlobal() {
    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getAllGlobalHeadGroup' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  getAllPayrollHeadGroup() {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  // delete payroll head group at global
  DeletePayrollHeadGroupGlobal( id: number ) {
    return this._HTTP.delete( environment.baseUrl8084 + 'headGroup/deleteGlobalHeadGroup/' + id )
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

  // add new PHG at group level
  AddPayrollHeadGroupAtGroup( data: SavePHG ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'headGroup', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  AddPayrollHeadGroupAtGlobal( data: SavePHGGlobal ): Observable<number | {}> {

    return this._HTTP.post( environment.baseUrl8084 + 'headGroup/global', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // update by global headGroup/updateGlobalHeadGroupById/12
  UpdatePayrollHeadGroupAtGlobal( id: number, data: SavePHGGlobal ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8084 + 'headGroup/updateGlobalHeadGroupById/' + id, data )
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

  //get Attribute Selection By Id  /headGroup/getGlobalPHGById/8

  getPHGByIdGlobal( id: number ) {
    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getGlobalPHGByIdWithMoon/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  GetPHGById( id: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'headGroup/getPHGById/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //update global

  UpdatePHGByIdGlobal( id: number, data: SavePHGGlobal ): Observable<number | {}> {

    return this._HTTP.put( environment.baseUrl8084 + 'headGroup/updateGlobalHeadGroupById/' + id, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

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
  GetAttributeOptionListByHeadGroupIdGetById( HeadGroupId: number ) {

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

  // /attribute-group/globalAttGroupByIdAsPerDepAtt
  // payrollhead-attribute-mapping/getAllInfoByHeadGroupId /  555
  ///payrollhead-attribute-mapping/getAllInfoByHeadGroupIdAsPerDepAttribute / 1009
  getByPayrollHeadGroupIdAllRecords( HeadGroupId: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAllInfoByHeadGroupIdAsPerDepAttribute/' + HeadGroupId )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  // ask api , if user update that time dependency attribute

  // attribute-group/global-getByGroupNameWithDepAtt/
  // old one   attribute-group/global-getByGroupName/

  //
  GetHeadGroupByGetGlobalPHGByName( attributeGroupName: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/global-getByGroupNameWithDepAtt/' + attributeGroupName )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // new method
  GetHeadGroupByGetGlobalPHGByNameWithHeadId( attributeGroupName: any, headGroupId: any ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/global-getByGroupNameWithDependentAttributeWithHeadGruopId/' + attributeGroupName + '/' + headGroupId )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }





  /////////////////******* ATTRIBUTE DEPENDENCY API  *****////////////////////



  addPHGAttributeDependency( data: any ) {

    return this._HTTP.post( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  getAttributeGroupByGroupDefId( id: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getGlobalAttribute2New( id1: number, id2: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  getGlobalAttribut33New( id1: number, id2: number, id3: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3 )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  getGlobalDependentAttributeNew( id1: number, id2: number, id3: number, id4: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3 + '/' + id4 )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  updateAttributeDependncyById( data: any ) {

    return this._HTTP.put( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getHeadNatureByNatureGroup() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-master/global-getByNatureGroup' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getGlobalAttribute1() {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeMaster' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getGlobalAttribute2( id: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeTwo/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getGlobalAttribute3( id1: number, id2: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeThree/' + id1 + '/' + id2 )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getGlobalAttributeById( id: number ) {

    return this._HTTP.get( environment.baseUrl8084 + 'getGlobalAttributeMasterById/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  getDerivedAttribute4( id1: number, id2: number, id3: number, id4: number ) {
    return this._HTTP.get( environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3 + '/' + id4 )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  getAllActivePHGAtrributeDep() {
    return this._HTTP.get( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }
  getPHGAttributeDepByIdPHGAttributeDepById() {
    return this._HTTP.get( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );

  }

  softDeletePayrollHeadGroupAttributeDependency( id: number ) {
    return this._HTTP.delete( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency/' + id )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  getAllActiveAndNonActiveAttributeDependency() {
    return this._HTTP.get( environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency/getAll' )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
}
