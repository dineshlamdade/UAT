"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankMasterAtGroupService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var BankMasterAtGroupService = /** @class */ (function () {
    function BankMasterAtGroupService(_HTTP) {
        this._HTTP = _HTTP;
    }
    BankMasterAtGroupService.prototype.postBankMaster = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/company-bankmaster/add-bank', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.postBankMasterMapping = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/company-bankmaster-mapping/map-bankmaster', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.getBankMasterDetails = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/company-bankmaster/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.putBankMasterMapping = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/company-bankmaster-mapping/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.putBankMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/company-bankmaster/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // searchIFSC(terms: any, stateModel: any) {
    //    return this._HTTP.get(environment.baseUrl8082 + '/bank-master/ifsc/' +stateModel+ '/' + terms)
    //   .pipe(map((res: any) =>{
    //     return res;
    //   }));
    // }
    BankMasterAtGroupService.prototype.getIfscCodeStateWise = function (state) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/bank-master/ifsc/' + state, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.searchIFSC = function (terms, stateModel) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/bank-master/ifsc/' + stateModel + '/' + terms)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.getStates = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/location-information/state/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.getDataFromIFSC = function (bankIFSC) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/bank-master/data/' + bankIFSC, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService.prototype.deleteCompanyBankMaster = function (Id) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + '/company-bankmaster/' + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    BankMasterAtGroupService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BankMasterAtGroupService);
    return BankMasterAtGroupService;
}());
exports.BankMasterAtGroupService = BankMasterAtGroupService;
