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
    CompanySettingsService.prototype.getAllAttributeCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-master/global')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeCreationById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-master/global/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.AddAttributeCreation = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // end of Services List Attribute-Creation Service
    // getAllAttributeCreation() {
    //
    //   return this._HTTP.get( environment.baseUrl8086 + 'payrollhead-attribute-master')
    //     .pipe(map((res: any) => {
    //       return res;
    //     }));
    // }
    CompanySettingsService.prototype.getAllAttributeSelection = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'attribute-group')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeSelectionById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'attribute-group/global/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.UpdateAttributeGroup = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'attribute-group/updateById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.GetAttributeOptionListByGroup = function (groupname) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'attribute-group/getGroupByName/' + groupname)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.AddAttributeSelection = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'attribute-group', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.DeleteAttributeSelection = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'attribute-group/delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // end of Attribute-Selection
    //get all frequency list
    CompanySettingsService.prototype.getFrequency = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'frequency-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get all businessyearlist
    CompanySettingsService.prototype.getAllBusinessYear = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-year')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get BusinessYearById
    CompanySettingsService.prototype.GetBusinessYearById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-year/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete BusinessYear
    CompanySettingsService.prototype.DeleteBusinessYearById = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-year/' + id)
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
    CompanySettingsService.prototype.UpdateBusinessYear = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-year/update/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CYCLE DEFINITION
    //get all cycle-definition
    CompanySettingsService.prototype.getAllCycleDefinition = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle-definition')
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
    CompanySettingsService.prototype.GetCycleDefinitionById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle-definition/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete cycle-definition
    CompanySettingsService.prototype.DeleteCycleDefinitionById = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'business-cycle-definition/' + id)
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
    CompanySettingsService.prototype.UpdateCycleDefinition = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'business-cycle-definition/update/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get all cycle-Creation
    CompanySettingsService.prototype.getAllCycleCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'business-cycle')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
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
    // get All HeadCreation
    CompanySettingsService.prototype.getAllHeadCreation = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-master/global')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get HeadCreationById
    CompanySettingsService.prototype.GetHeadCreationById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-master/global/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new BusinessYear
    CompanySettingsService.prototype.AddHeadCreation = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'payrollhead-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get All PayrollHeadGroup
    CompanySettingsService.prototype.getAllPayrollHeadGroup = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'headGroup')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //delete Payroll Head Group
    CompanySettingsService.prototype.DeletePayrollHeadGroup = function (id) {
        return this._HTTP["delete"](environment_1.environment.baseUrl8086 + 'headGroup/delete/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add new PHG
    CompanySettingsService.prototype.AddPayrollHeadGroup = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'headGroup', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get Attribute Selection By Id
    CompanySettingsService.prototype.GetPHGById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'headGroup/getPHGById/' + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update BusinessYear
    CompanySettingsService.prototype.UpdatePHGById = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'headGroup/updateById/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //get Head table list on slection of copy form dropdown
    CompanySettingsService.prototype.GetHeadListByPHGname = function (PHGname) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'headGroup/getPHGByName/' + PHGname)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //add attribute assignment
    CompanySettingsService.prototype.AddAttributeAssignment = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-mapping', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //Get AttributeOptionList By HeadGroupId
    CompanySettingsService.prototype.GetAttributeOptionListByHeadGroupId = function (HeadGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-mapping/getAttributeMasterListByHeadGroupId/' + HeadGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //Get AttributeOptionList By HeadGroupId
    CompanySettingsService.prototype.GetAttributeOptionListByHeadGroupIdGetById = function (HeadGroupId) {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-mapping/getByHeadGroupId/' + HeadGroupId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get formula for formula master
    CompanySettingsService.prototype.getFromulaForFormulaMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'formula-master')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanySettingsService.prototype.getSDMFormula = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'companySDMForm')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //update attribute list by id
    CompanySettingsService.prototype.UpdateattributeListById = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8086 + 'payrollhead-attribute-mapping', data)
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
