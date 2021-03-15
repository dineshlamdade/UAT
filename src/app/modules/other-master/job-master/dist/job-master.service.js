"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobMasterService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var JobMasterService = /** @class */ (function () {
    function JobMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    JobMasterService.prototype.get = function (path) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + path, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService.prototype.getAllOtherMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'all-other-masters/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // get all company name like infy
    JobMasterService.prototype.getAllAtGroup = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'companymaster/getAllAtGroup', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService.prototype.getAllOtheMappingDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + 'all-othermasters-mapping/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService.prototype.post = function (data, path) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        console.log(data);
        return this._HTTP.post(environment_1.environment.baseUrl8083 + path, data, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService.prototype.put = function (data, path) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        console.log(data);
        return this._HTTP.put(environment_1.environment.baseUrl8083 + path, data, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService.prototype["delete"] = function (Id, path) {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8083 + path + Id, { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    JobMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], JobMasterService);
    return JobMasterService;
}());
exports.JobMasterService = JobMasterService;
