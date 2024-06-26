"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyMasterService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers1 = new http_1.HttpHeaders({
    'X-TenantId': 'PaysquareDefault',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
});
var CompanyMasterService = /** @class */ (function () {
    function CompanyMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    CompanyMasterService.prototype.getCountryCodes = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/phone-code')
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getAddressFromPIN = function (postalCode) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/pincode-details-check/' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getLocationInformationOrCountryList = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getTypeOfEstablishment = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companygroupdropdown-master/TypeOfEstablishment', { 'headers': headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getIndustryTypeMaster = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companygroupdropdown-master/industrytype', { 'headers': headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.postCompanyMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'companymaster', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getCompanyMasterDataById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companymaster/' + id, { 'headers': headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getAllCompanyMasterData = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companymaster', { 'headers': headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getCurrencyList = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/currency-information/symbol', { headers: headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getLanguagesList = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/language-information/name', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService.prototype.getCompanyMasterById = function (id) {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companymaster/' + id, { 'headers': headers1 })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    CompanyMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanyMasterService);
    return CompanyMasterService;
}());
exports.CompanyMasterService = CompanyMasterService;
