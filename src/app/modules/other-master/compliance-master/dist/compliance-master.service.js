"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceMasterService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    'Content-Type': 'application/json',
    'X-TenantId': 'PaysquareDefault'
});
var ComplianceMasterService = /** @class */ (function () {
    function ComplianceMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    ComplianceMasterService.prototype.postComplianceMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'compliance-master/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.putComplianceMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-master/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // http://localhost:8083/hrms/v1/compliance-master/update-all
    ComplianceMasterService.prototype.putUpdateAllComlianceMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-master/update-all', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.deleteComplianceMasterDetail = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + 'compliance-master/update-details' + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.deleteAllComplianc = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-master/delete/' + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // compliance-master/delete/{complianceMasterId}
    // http://localhost:8083/hrms/v1/compliance-master/delete/{complianceMasterId}
    ComplianceMasterService.prototype.deleteComplianceApplicability = function (id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/delete/' + id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // putComplianceApplicability(data) {
    //   return this._HTTP.put(environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
    //     .pipe(map((res: any) => {
    //       return res;
    //     }));
    // }
    // /
    ComplianceMasterService.prototype.deleteComplianceMaster = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + 'compliance-master/' + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //  return this._HTTP.put(environment.baseUrl8083 + 'compliance-master/update-details', data)
    ComplianceMasterService.prototype.putComplianceMasterUpdateDetails = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-master/update-details', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.postComplianceApplicability = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.putComplianceApplicability = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
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
    ComplianceMasterService.prototype.getListOfCityFromTheState = function (stateName) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/city/' + stateName, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getComplianceMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'compliance-master/', { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // http://localhost:8086/hrms/v1/frequency-master/getAllActive
    ComplianceMasterService.prototype.getFrequencyMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8086 + 'frequency-master/getAllActive')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getAllOtherMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'all-other-masters/details', { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getAllOtherMastersMappingDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'all-othermasters-mapping/details', { headers: headers })
            // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/all-othermasters-mapping/details',{'headers': headers})
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getStates = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/state/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/Applicability Compliance/
    // after changing url
    /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/complianceApplicabilitySDMId
    /// http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/statutoryFrequencySDMId
    ComplianceMasterService.prototype.getDropDownValuesByApplicationModuleName_FieldName = function (fieldName) {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'source-derived-matrix/derived-module-mapping/compliance/' + fieldName)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // http://localhost:8083/hrms/v1/complianceMaster-SDM-Mapping/
    ComplianceMasterService.prototype.getComplianceMasterSDMMapping = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', { headers: { 'X-TenantId': 'PaysquareDefault', 'Content-Type': 'application/json' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.postComplianceMaste = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.putComplianceMasterSDMMapping = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'complianceMaster-SDM-Mapping/', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ComplianceMasterService);
    return ComplianceMasterService;
}());
exports.ComplianceMasterService = ComplianceMasterService;
