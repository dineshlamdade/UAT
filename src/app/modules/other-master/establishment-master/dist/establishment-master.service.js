"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentMasterService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var headers = new Headers({
    "Content-Type": "application/json",
    "X-TenantId": "PaysquareDefault"
});
var EstablishmentMasterService = /** @class */ (function () {
    function EstablishmentMasterService(_HTTP) {
        this._HTTP = _HTTP;
    }
    EstablishmentMasterService.prototype.postEstablishmentMaster = function (data) {
        console.log(data.regionMasterId);
        return this._HTTP.post(environment_1.environment.baseUrl8083 + '/establishment-master/add-establishment', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    EstablishmentMasterService.prototype.putEstablishmentMaster = function (data) {
        return this._HTTP.put(environment_1.environment.baseUrl8083 + '/establishment-master/update', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    EstablishmentMasterService.prototype.getEstablishmentMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/establishment-master/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    EstablishmentMasterService.prototype.getRegionMasterDetails = function () {
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.get(environment_1.environment.baseUrl8083 + '/region-master/details', { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    EstablishmentMasterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EstablishmentMasterService);
    return EstablishmentMasterService;
}());
exports.EstablishmentMasterService = EstablishmentMasterService;
