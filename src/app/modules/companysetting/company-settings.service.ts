import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SaveAttributeCreation } from '../companysetting/attributecreation/attributecreation.model';
import { environment } from './../../../environments/environment';
import { SaveAttributeSelection, SavePHG } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { saveBusinessYear } from '../companysetting/bc/payroll.model';
import { saveCycleCreation, saveCycleDefinition } from './business-cycle/business-cycle.component';
import { SaveHeadCreation } from '../companysetting/headcreation/headcreation.model';
import { UpdateflagCycleCreation } from '../companysetting/payrollheadgroupcreation/payrollheadgroupcreation.model';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {
  constructor(private _HTTP: HttpClient) { }

  getAllAttributeCreation() {

    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-attribute-master/global')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  GetAttributeCreationById(id: number) {
    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-attribute-master/global/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  AddAttributeCreation(data: SaveAttributeCreation): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'payrollhead-attribute-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // end of Services List Attribute-Creation Service

  // getAllAttributeCreation() {
  //
  //   return this._HTTP.get( environment.baseUrl8086 + 'payrollhead-attribute-master')
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }

  getAllAttributeSelection() {

    return this._HTTP.get(environment.baseUrl8086 + 'attribute-group')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  GetAttributeSelectionById(id: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'attribute-group/global/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  UpdateAttributeGroup(id: number, data: SaveAttributeSelection): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'attribute-group/updateById/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  GetAttributeOptionListByGroup(groupname: string) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'attribute-group/getGroupByName/' + groupname)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  AddAttributeSelection(data: SaveAttributeSelection): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'attribute-group', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  DeleteAttributeSelection(id: number) {
    return this._HTTP.delete(environment.baseUrl8086 + 'attribute-group/delete/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // end of Attribute-Selection



  //get all frequency list
  getFrequency() {

    return this._HTTP.get(environment.baseUrl8086 + 'frequency-master')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  //get all businessyearlist
  getAllBusinessYear() {

    return this._HTTP.get(environment.baseUrl8086 + 'business-year')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  //get BusinessYearById
  GetBusinessYearById(id: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'business-year/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete BusinessYear
  DeleteBusinessYearById(id: number) {
    return this._HTTP.delete(environment.baseUrl8086 + 'business-year/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new BusinessYear
  AddBusinessYear(data: saveBusinessYear): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'business-year', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //update BusinessYear
  UpdateBusinessYear(id: number, data: saveBusinessYear): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'business-year/update/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CYCLE DEFINITION

  //get all cycle-definition
  getAllCycleDefinition() {

    return this._HTTP.get(environment.baseUrl8086 + 'business-cycle-definition')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all service-code
  getAllServicesName() {

    return this._HTTP.get(environment.baseUrl8086 + 'service-code')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get cycle-definition ById
  GetCycleDefinitionById(id: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'business-cycle-definition/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete cycle-definition
  DeleteCycleDefinitionById(id: number) {
    return this._HTTP.delete(environment.baseUrl8086 + 'business-cycle-definition/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new cycle-definition
  AddCycleDefinition(data: saveCycleDefinition): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'business-cycle-definition', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //update cycle-definition
  UpdateCycleDefinition(id: number, data: saveCycleDefinition): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'business-cycle-definition/update/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all cycle-Creation
  getAllCycleCreation() {

    return this._HTTP.get(environment.baseUrl8086 + 'business-cycle')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete cycle-Creation by id
  DeleteCycleCreationById(businessCycleDefinitionId: number, BusinessYear: string) {
    return this._HTTP.delete(environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get cycle-Creation by id
  getCycleCreationById(businessCycleDefinitionId: number, BusinessYear: string) {
    return this._HTTP.get(environment.baseUrl8086 + 'business-cycle/cycle-definition/' + businessCycleDefinitionId + '/' + BusinessYear)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new cycle-Creation
  AddCycleCreation(data: saveCycleCreation): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'business-cycle', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete Preview Cycle Discard
  DeletePreviewCycleDiscard(businessCycleDefinitionId: number, BusinessYear: string) {

    return this._HTTP.delete(environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Edit toDate of cycle-Creation
  EdittoDate(businessCycleDefinitionId: number, BusinessYear: string, data: any): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'business-cycle/update/' + businessCycleDefinitionId + '/' + BusinessYear, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //ForcetoYearEnd of cycle-Creation
  ForcetoYearEnd(businessCycleDefinitionId: number, BusinessYear: string, data: any): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'business-cycle/force-end/' + businessCycleDefinitionId + '/' + BusinessYear, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  // get All HeadCreation
  getAllHeadCreation() {

    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-master/global')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get HeadCreationById
  GetHeadCreationById(id: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-master/global/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new BusinessYear
  AddHeadCreation(data: SaveHeadCreation): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'payrollhead-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // get All PayrollHeadGroup
  getAllPayrollHeadGroup() {

    return this._HTTP.get(environment.baseUrl8086 + 'headGroup')
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //delete Payroll Head Group
  DeletePayrollHeadGroup(id: number) {
    return this._HTTP.delete(environment.baseUrl8086 + 'headGroup/delete/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }



  //add new PHG
  AddPayrollHeadGroup(data: SavePHG): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'headGroup', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get Attribute Selection By Id
  GetPHGById(id: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'headGroup/getPHGById/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //update BusinessYear
  UpdatePHGById(id: number, data: SavePHG): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'headGroup/updateById/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get Head table list on slection of copy form dropdown
  GetHeadListByPHGname(PHGname: string) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'headGroup/getPHGByName/' + PHGname)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //add attribute assignment
  AddAttributeAssignment(data: UpdateflagCycleCreation): Observable<number | {}> {

    return this._HTTP.post(environment.baseUrl8086 + 'payrollhead-attribute-mapping', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get AttributeOptionList By HeadGroupId
  GetAttributeOptionListByHeadGroupId(HeadGroupId: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-attribute-mapping/getAttributeMasterListByHeadGroupId/' + HeadGroupId)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //Get AttributeOptionList By HeadGroupId
  GetAttributeOptionListByHeadGroupIdGetById(HeadGroupId: number) {//: Observable<saveBusinessYear | {}> {

    return this._HTTP.get(environment.baseUrl8086 + 'payrollhead-attribute-mapping/getByHeadGroupId/' + HeadGroupId)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // get formula for formula master
  getFromulaForFormulaMaster() {

    return this._HTTP.get(environment.baseUrl8086 + 'formula-master')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getSDMFormula() {

    return this._HTTP.get(environment.baseUrl8086 + 'companySDMForm')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //update attribute list by id
  UpdateattributeListById(data: UpdateflagCycleCreation): Observable<number | {}> {

    return this._HTTP.put(environment.baseUrl8086 + 'payrollhead-attribute-mapping', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}

export interface Product {
  code: string;
  attributeNature: string;
  description: string;
}

