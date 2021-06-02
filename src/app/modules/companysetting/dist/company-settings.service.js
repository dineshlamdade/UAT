"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySettingsService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../environments/environment");
var CompanySettingsService = /** @class */ (function () {
    function CompanySettingsService(_HTTP) {
        this._HTTP = _HTTP;
    }
    CompanySettingsService.prototype.getAllPayrollheadAttributeMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // getAllGlobalAttributeMastter() {
    //   return this._HTTP.get( environment.baseUrl8084 + 'payrollhead-attribute-master/getAllGlobalAttributeMaster' )
    //     .pipe( map( ( res: any ) => {
    //       return res;
    //     } ) );
    // }
    // get data from  [GlobalAttributeMaster]
    //  /attribute-group/global-getAll
    CompanySettingsService.prototype.getAllGlobalAttributeMasterByGlobal = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/global-getAll')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllGlobalAttributeMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAllGlobalAttributeMaster')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAttributeGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // this is getting value from global
    CompanySettingsService.prototype.getByHeadMasterByNature = function (earningordeduction) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/globalHeadType/' + earningordeduction)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getByHeadMasterByNatureByGroup = function (earningordeduction) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/headType/' + earningordeduction)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // getAll GlobalAttributeMaster
    CompanySettingsService.prototype.getAllGlobalAttributeCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeMaster')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllAttributeCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeCreationById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAttMaster/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // added at globally [GlobalAttributeMaster]
    CompanySettingsService.prototype.AddAttributeCreation = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // added at globally  GlobalAttributeMaster GlobalAttributeOption
    CompanySettingsService.prototype.UpdateAttributeCreation = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // added at globally  GlobalAttributeMaster GlobalAttributeOption
    CompanySettingsService.prototype.getAllPayrollHeadAttributeMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllAttributeSelectionByGlobal = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/global-getAll')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllAttributeSelection = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //attribute-group/globalAttGroupById/23
    CompanySettingsService.prototype.GetAttriubuteSelectionByIdGlobal = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/globalAttGroupById/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeSelectionById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/global/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.UpdateAttributeGlobal = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'attribute-group/updateAttGroupDefById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.UpdateAttributeGroup = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'attribute-group/updateById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeOptionListByGlobal = function (phgName) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getGlobalPHGByName/' + phgName)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get by global
    CompanySettingsService.prototype.getHeadMasterGroupByPHG_GroupDefId = function (headGroupDefId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getGlobalPHGById/' + headGroupDefId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeOptionListByGroup = function (groupname) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getGroupByName/' + groupname)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // attribute-group/global-add
    // this willl save into [AttributeGroupDefinition] of group level
    CompanySettingsService.prototype.AddAttributeSelectionGlobal = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'attribute-group/global-add', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.AddAttributeSelection = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'attribute-group', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.DeleteAttributeSelectionAtGlobal = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8084 + 'attribute-group/globalDelete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.DeleteAttributeSelection = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8084 + 'attribute-group/delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // end of Attribute-Selection
    //get all frequency lists
    CompanySettingsService.prototype.getActiveFrequency = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'frequency-master/getAllActive')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get all businessyearlist
    CompanySettingsService.prototype.getAllBusinessYear = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-year/getAll-Active-bussiness-year')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get BusinessYearById'
    // http://localhost:8086/hrms/v1/business-year/27
    CompanySettingsService.prototype.GetBusinessYearById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-year/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete BusinessYear
    //business-year/soft-delete/10
    CompanySettingsService.prototype.DeleteBusinessYearById = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-year/soft-delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new BusinessYear
    CompanySettingsService.prototype.AddBusinessYear = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'business-year', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update BusinessYear
    CompanySettingsService.prototype.UpdateBusinessYear = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-year/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CYCLE DEFINITION
    //get all cycle-definition
    // http://localhost:8086/hrms/v1/business-cycle-definition/getAllActiveNonActive
    CompanySettingsService.prototype.getAllCycleDefinition = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle-definition/getAllActive')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.addBusiness_cycle_cycle_definition = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'business-cycle/cycle-definition', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // val1 val2 val3 val4
    CompanySettingsService.prototype.postPayrollHeadAttributeMappingAddGlobal = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/addGlobal', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // payrollhead-attribute-mapping/newUpdatePHGAttributeValueRefFM
    // payrollhead-attribute-mapping/newUpdatePHGAttributeValueRefFM date spliting logic
    //payrollhead-attribute-mapping/updateGlobal // old update api
    CompanySettingsService.prototype.putPayrollHeadAttributeMappingAddGlobal = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/updateGlobal', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //http://localhost:8084/hrms/v1/payrollhead-attribute-mapping/getAllPayRollHeadGroupAttributeHistory/{headGroupId}/{AttributeGroupId} 555
    CompanySettingsService.prototype.getAllPayRollHeadGroupAttributeHistory = function (headGroupId, AttributeGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAllPayRollHeadGroupAttributeHistory/' + headGroupId + '/' + AttributeGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllCycleCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle/cycle-definition-getAll')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get all service-code
    CompanySettingsService.prototype.getAllServicesName = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'service-code')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get cycle-definition ById
    //  /business-cycle-definition/1
    CompanySettingsService.prototype.GetCycleDefinitionById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle-definition/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete cycle-definition
    CompanySettingsService.prototype.DeleteCycleDefinitionById = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-cycle-definition/delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new cycle-definition
    CompanySettingsService.prototype.AddCycleDefinition = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'business-cycle-definition', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update cycle-definition
    CompanySettingsService.prototype.UpdateCycleDefinition = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-cycle-definition/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get all cycle-Creation
    // getAllCycleCreation() {
    //   return this._HTTP.get(environment.baseUrl8086 + 'business-cycle-definition/getAllActiveNonActive')
    //     .pipe(map((res: any) => {
    //       return res;
    //     }));
    // }
    //delete cycle-Creation by id
    CompanySettingsService.prototype.DeleteCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get cycle-Creation by id
    CompanySettingsService.prototype.getCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle/cycle-definition/' + businessCycleDefinitionId + '/' + BusinessYear)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new cycle-Creation
    CompanySettingsService.prototype.AddCycleCreation = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'business-cycle', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete Preview Cycle Discard
    CompanySettingsService.prototype.DeletePreviewCycleDiscard = function (businessCycleDefinitionId, BusinessYear) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-cycle/cycles/' + businessCycleDefinitionId + '/' + BusinessYear)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //Edit toDate of cycle-Creation
    CompanySettingsService.prototype.EdittoDate = function (businessCycleDefinitionId, BusinessYear, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-cycle/update/' + businessCycleDefinitionId + '/' + BusinessYear, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //ForcetoYearEnd of cycle-Creation
    CompanySettingsService.prototype.ForcetoYearEnd = function (businessCycleDefinitionId, BusinessYear, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-cycle/force-end/' + businessCycleDefinitionId + '/' + BusinessYear, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get All HeadCreation from group old value was 86 and head-creation/get
    // below one is get data from global
    CompanySettingsService.prototype.getAllHeadCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-master/global-getAll')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllHeadCreationByGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'head-creation/get')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllActivePayrollHeadGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/getGlobal')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get HeadCreationById by global
    CompanySettingsService.prototype.GetHeadCreationById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-master/global-get/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetHeadCreationByIdByGroup = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'head-creation/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add payrollhead-master/global-add old one was  'head-creation' and port 8086
    CompanySettingsService.prototype.AddHeadCreationForGroup = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'head-creation', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // this is for global
    CompanySettingsService.prototype.AddHeadCreation = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'payrollhead-master/global-add', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get All PayrollHeadGroup
    // headGroup/getAllGlobalHeadGroup
    CompanySettingsService.prototype.getAllPayrollHeadGroupAtGlobal = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getAllGlobalHeadGroup')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllPayrollHeadGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // delete payroll head group at global
    CompanySettingsService.prototype.DeletePayrollHeadGroupGlobal = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8084 + 'headGroup/deleteGlobalHeadGroup/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete Payroll Head Group
    CompanySettingsService.prototype.DeletePayrollHeadGroup = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8084 + 'headGroup/delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // add new PHG at group level
    CompanySettingsService.prototype.AddPayrollHeadGroupAtGroup = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'headGroup', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.AddPayrollHeadGroupAtGlobal = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'headGroup/global', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // update by global headGroup/updateGlobalHeadGroupById/12
    CompanySettingsService.prototype.UpdatePayrollHeadGroupAtGlobal = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'headGroup/updateGlobalHeadGroupById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new PHG
    CompanySettingsService.prototype.AddPayrollHeadGroup = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'headGroup', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get Attribute Selection By Id  /headGroup/getGlobalPHGById/8
    CompanySettingsService.prototype.getPHGByIdGlobal = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getGlobalPHGByIdWithMoon/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetPHGById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getPHGById/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update global
    CompanySettingsService.prototype.UpdatePHGByIdGlobal = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'headGroup/updateGlobalHeadGroupById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.UpdatePHGById = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'headGroup/updateById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get Head table list on slection of copy form dropdown
    CompanySettingsService.prototype.GetHeadListByPHGname = function (PHGname) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'headGroup/getPHGByName/' + PHGname)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add attribute assignment
    CompanySettingsService.prototype.AddAttributeAssignment = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //Get AttributeOptionList By HeadGroupId
    CompanySettingsService.prototype.GetAttributeOptionListByHeadGroupId = function (HeadGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAttributeMasterListByHeadGroupId/' + HeadGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //Get AttributeOptionList By HeadGroupId
    CompanySettingsService.prototype.GetAttributeOptionListByHeadGroupIdGetById = function (HeadGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/getByHeadGroupId/' + HeadGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get formula for formula master
    CompanySettingsService.prototype.getFromulaForFormulaMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'formula-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getSDMFormula = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'companySDMForm')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update attribute list by id
    CompanySettingsService.prototype.UpdateattributeListById = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // /attribute-group/globalAttGroupByIdAsPerDepAtt
    // payrollhead-attribute-mapping/getAllInfoByHeadGroupId /  555
    ///payrollhead-attribute-mapping/getAllInfoByHeadGroupIdAsPerDepAttribute / 1009
    CompanySettingsService.prototype.getByPayrollHeadGroupIdAllRecords = function (HeadGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-mapping/getAllInfoByHeadGroupIdAsPerDepAttribute/' + HeadGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // ask api , if user update that time dependency attribute
    // attribute-group/global-getByGroupNameWithDepAtt/
    // old one   attribute-group/global-getByGroupName/
    //
    CompanySettingsService.prototype.GetHeadGroupByGetGlobalPHGByName = function (attributeGroupName) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/global-getByGroupNameWithDepAtt/' + attributeGroupName)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // new method
    CompanySettingsService.prototype.GetHeadGroupByGetGlobalPHGByNameWithHeadId = function (attributeGroupName, headGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/global-getByGroupNameWithDependentAttributeWithHeadGruopId/' + attributeGroupName + '/' + headGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    /////////////////******* ATTRIBUTE DEPENDENCY API  *****////////////////////
    CompanySettingsService.prototype.addPHGAttributeDependency = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAttributeGroupByGroupDefId = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttribute2New = function (id1, id2) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttribut33New = function (id1, id2, id3) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalDependentAttributeNew = function (id1, id2, id3, id4) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3 + '/' + id4)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.updateAttributeDependncyById = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getHeadNatureByNatureGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-master/global-getByNatureGroup')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttribute1 = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeMaster')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttribute2 = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeTwo/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttribute3 = function (id1, id2) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'payrollhead-attribute-master/getAllActiveGlobalAttributeThree/' + id1 + '/' + id2)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getGlobalAttributeById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'getGlobalAttributeMasterById/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getDerivedAttribute4 = function (id1, id2, id3, id4) {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'attribute-group/getAttributeGroupByAttGroupDefId/' + id1 + '/' + id2 + '/' + id3 + '/' + id4)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getAllActivePHGAtrributeDep = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getPHGAttributeDepByIdPHGAttributeDepById = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.softDeletePayrollHeadGroupAttributeDependency = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // PayrollHeadGroup-AttributeDependency/getAll active as well as non-active record
    CompanySettingsService.prototype.getAllActiveAndNonActiveAttributeDependency = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8084 + 'PayrollHeadGroup-AttributeDependency')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanySettingsService);
    return CompanySettingsService;
}());
exports.CompanySettingsService = CompanySettingsService;
