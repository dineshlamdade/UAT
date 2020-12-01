"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyRegistrationDetailsService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var CompanyRegistrationDetailsService = /** @class */ (function () {
    function CompanyRegistrationDetailsService(_HTTP) {
        this._HTTP = _HTTP;
    }
    CompanyRegistrationDetailsService.prototype.postCompanyRegistrationDetails = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/companyregistration-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyRegistrationDetailsService.prototype.putCompanyRegistrationDetails = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/companyregistration-master', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyRegistrationDetailsService.prototype.getAllActiveCompanyForRegistration = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companymaster/getAllActiveCompanysForRegistration', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyRegistrationDetailsService.prototype.getCompanyRegistrationMaster = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/companyregistration-master', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyRegistrationDetailsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanyRegistrationDetailsService);
    return CompanyRegistrationDetailsService;
}());
exports.CompanyRegistrationDetailsService = CompanyRegistrationDetailsService;
