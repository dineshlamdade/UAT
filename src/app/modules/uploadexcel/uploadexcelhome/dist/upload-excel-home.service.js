"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadExcelHomeService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../../../environments/environment");
var UploadExcelHomeService = /** @class */ (function () {
    function UploadExcelHomeService(_HTTP) {
        this._HTTP = _HTTP;
    }
    //   URL: http://localhost:8083/hrms/v1/excel-template-generation
    // XTenantId:PaysquareDefault
    UploadExcelHomeService.prototype.postExcelTemplateGeneration = function (data) {
        var headers = new http_1.HttpHeaders()
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.post(environment_1.environment.baseUrl8082 + '/excel-template/creation', data, { 'headers': headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UploadExcelHomeService.prototype.deleteExcelTemplate = function (templateMasterId) {
        var headers = new http_1.HttpHeaders()
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP["delete"](environment_1.environment.baseUrl8082 + '/excel-template/templateMasterId/' + templateMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // check below code for delete
    // deleteEducationGridItem(deleteEducationId) {
    //   return this.httpClient.delete(environment.baseUrl8082 + '/education-skill-details/education/' + deleteEducationId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
    //     .pipe(map((res: any) => {
    //       return res;
    //     }))
    // }
    // i have hardcoded company id to 1 in .ts file
    UploadExcelHomeService.prototype.getAllExcelTemplate = function (companyId) {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/excel-template/all/' + companyId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // http://localhost:8083/hrms/v1/excel-upload
    // Key :file
    // Value :excel file
    UploadExcelHomeService.prototype.postExcelUpload = function (data) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('X-TenantId', 'PaysquareDefault');
        return this._HTTP.post(environment_1.environment.baseUrl8082 + '/excel-upload', data, { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UploadExcelHomeService.prototype.getExcelTableFields = function () {
        return this._HTTP.get(environment_1.environment.baseUrl8082 + '/excel-template/getTableFields', { headers: { 'X-TenantId': 'PaysquareDefault' } })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UploadExcelHomeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UploadExcelHomeService);
    return UploadExcelHomeService;
}());
exports.UploadExcelHomeService = UploadExcelHomeService;
