"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceMasterService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var ComplianceMasterService = /** @class */ (function () {
    function ComplianceMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    ComplianceMasterService.prototype.postComplianceMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/compliance-master/add-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.putComplianceMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/compliance-master/update-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.deleteComplianceMasterDetail = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + '/compliance-master/detail/' + Id, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.deleteComplianceMaster = function (Id) {
        console.log(Id);
        console.log(Id);
        console.log(Id);
        console.log(Id);
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + '/compliance-master/' + Id, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.putComplianceMasterUpdateDetails = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/compliance-master/update-details', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.postComplianceApplicability = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/compliance-applicability/add-applicability', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getComplianceApplicabilityDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/compliance-applicability/details', { 'headers': headers })
            // return this._HTTP.get('http://deliziahruat.paysquare.com:8083/hrms/v1/compliance-applicability/details',{'headers': headers})
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getListOfCityFromTheState = function (stateName) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        //  return this._HTTP.get(environment.baseUrl8082 + '/location-information/city/+ stateName,{ headers: { 'X-TenantId': 'PaysquareGlobal' } })
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
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/compliance-master/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getAllOtherMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/all-other-masters/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceMasterService.prototype.getAllOtherMastersMappingDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/all-othermasters-mapping/details', { 'headers': headers })
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
    ComplianceMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ComplianceMasterService);
    return ComplianceMasterService;
}());
exports.ComplianceMasterService = ComplianceMasterService;
