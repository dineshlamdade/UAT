"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceHeadService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var ComplianceHeadService = /** @class */ (function () {
    function ComplianceHeadService(_HTTP) {
        this._HTTP = _HTTP;
    }
    ComplianceHeadService.prototype.postComplianceHead = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'compliance-head/add-head', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceHeadService.prototype.putComplianceHead = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-head/update-head', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceHeadService.prototype.getLocationInformationOrCountryList = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceHeadService.prototype.getComplianceHeadDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'compliance-head/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceHeadService.prototype.deleteComplianceHead = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'compliance-head/softdelete/' + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ComplianceHeadService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ComplianceHeadService);
    return ComplianceHeadService;
}());
exports.ComplianceHeadService = ComplianceHeadService;
