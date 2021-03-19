"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankMasterAtCompanyService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var BankMasterAtCompanyService = /** @class */ (function () {
    function BankMasterAtCompanyService(_HTTP) {
        this._HTTP = _HTTP;
    }
    BankMasterAtCompanyService.prototype.postBankMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'company-bankmaster/add-bank', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.postBankMasterMapping = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + 'company-bankmaster-mapping/map-bankmaster', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.getBankMasterDetails = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'company-bankmaster/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.putBankMasterMapping = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + 'company-bankmaster-mapping/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.getDataFromIFSC = function (bankIFSC) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + 'bank-master/data/' + bankIFSC, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.getCompanyBanMasterMappingDetails = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'company-bankmaster-mapping/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.deleteCompanyBankMasterMapping = function (data) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + 'company-bankmaster-mapping/' + data, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService.prototype.getGroupCompanyDetails = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'group-company/details', { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtCompanyService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BankMasterAtCompanyService);
    return BankMasterAtCompanyService;
}());
exports.BankMasterAtCompanyService = BankMasterAtCompanyService;
