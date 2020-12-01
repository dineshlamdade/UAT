"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyGroupMasterService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var CompanyGroupMasterService = /** @class */ (function () {
    function CompanyGroupMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    CompanyGroupMasterService.prototype.getCompanyGroupMaster = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companygroup-master', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService.prototype.getCompanygroupdropdownMaster = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companygroupdropdown-master', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService.prototype.getCompanygroupdropdownScaleMaster = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companygroupdropdown-master/scale', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService.prototype.getCompanygroupdropdownReasonForExitMaster = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companygroupdropdown-master/ReasonForExit', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService.prototype.postCompanyGroupMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/companygroup-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService.prototype.putCompanyGroupMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/companygroup-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyGroupMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanyGroupMasterService);
    return CompanyGroupMasterService;
}());
exports.CompanyGroupMasterService = CompanyGroupMasterService;
