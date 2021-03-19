"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRolesPermissionService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("./../../../../environments/environment");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var headers = new Headers({
    "Content-Type": "application/json"
});
var UserRolesPermissionService = /** @class */ (function () {
    function UserRolesPermissionService(_HTTP, authservice) {
        this._HTTP = _HTTP;
        this.authservice = authservice;
    }
    UserRolesPermissionService.prototype.getByCompanyGroupMaster = function () {
        // alert()
        //  let token = this.authservice.getJwtToken()
        //  let token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzIiwiVXNlckRldGFpbHMiOnsiZ3JvdXBOYW1lIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJXaGl0ZUhlZGdlIiwiZW1haWxJZCI6InByZWV0aS5ndXB0YUBwYXlzcXVhcmUuY29tIiwidXNlck5hbWUiOiJQcmVldGlHIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MTF9LCJpc3MiOiJodHRwOi8vcGF5c3F1YXJlLmNvbSIsImV4cCI6MTYxNTc5MTI1NCwiaWF0IjoxNjE1Nzg5NDU0LCJqdGkiOiI4Y2VmYTVkOS05NWM1LTRmZTMtODRhOC1iMWRiM2RkODFkYjYifQ.EeBofzbdUQ4MxwRayPx549x7osBN9HvDdoJrBO9X43kQnOQE3qUgXUDOB_QtjV_7ESUWb5K89s-HV3BlZ93JvwaN9GuR9qIDbwf3vvyuKGG5gyuQ2JLSD9Fm0BLjsMtjdmp89MNYQ1_U6xWj6UX3hoNUnhv1MSDvrEQJYFHVQngCYIGEFXIfRfkjGMCnqf4jQEiT-VXOKDp_CbIqvo8DnCzgzgVQGZBfGkho93nUTRMA2jTVaxfwnj-xVOkq32ng5C7mbg1Ztu7bm5VcFyLID7XGCcesDNLQBg3pbmDch93NfBXn2rwSWV9OB235mIDTsff4J1Ne3_O8ChTa7x1dFA"
        //  console.log(token);
        // const headers = new HttpHeaders()
        //   .set('content-type', 'application/json')
        //   .set('Access-Control-Allow-Origin', '*')
        // .set('X-Authorization', token);
        return this._HTTP.get(environment_1.environment.baseUrl8080 + 'user-role/getBycompanyGroupMasterId/12')
            .pipe(operators_1.map(function (res) {
            console.log(res);
            return res;
        }));
    };
    UserRolesPermissionService.prototype.getUserGroupForRoleGroup = function () {
        var token = this.authservice.getJwtToken();
        var headers = new http_1.HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('X-Authorization', token);
        console.log(headers);
        return this._HTTP.get(environment_1.environment.baseUrl8080 + 'user-group/getByCompanyGroupId/12', { headers: headers })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UserRolesPermissionService.prototype.postUserRollData = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-role', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UserRolesPermissionService.prototype.updateUserRollData = function (id, data) {
        return this._HTTP.put(environment_1.environment.baseUrl8080 + 'user-role/' + id, data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //--------------start user group API-----------------------------
    //--------------G user group API-----------------------------
    UserRolesPermissionService.prototype.getAllUserGroupData = function () {
        var token = this.authservice.getJwtToken();
        //  let token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzIiwiVXNlckRldGFpbHMiOnsiZ3JvdXBOYW1lIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJXaGl0ZUhlZGdlIiwiZW1haWxJZCI6InByZWV0aS5ndXB0YUBwYXlzcXVhcmUuY29tIiwidXNlck5hbWUiOiJQcmVldGlHIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MTF9LCJpc3MiOiJodHRwOi8vcGF5c3F1YXJlLmNvbSIsImV4cCI6MTYxNTc5MTI1NCwiaWF0IjoxNjE1Nzg5NDU0LCJqdGkiOiI4Y2VmYTVkOS05NWM1LTRmZTMtODRhOC1iMWRiM2RkODFkYjYifQ.EeBofzbdUQ4MxwRayPx549x7osBN9HvDdoJrBO9X43kQnOQE3qUgXUDOB_QtjV_7ESUWb5K89s-HV3BlZ93JvwaN9GuR9qIDbwf3vvyuKGG5gyuQ2JLSD9Fm0BLjsMtjdmp89MNYQ1_U6xWj6UX3hoNUnhv1MSDvrEQJYFHVQngCYIGEFXIfRfkjGMCnqf4jQEiT-VXOKDp_CbIqvo8DnCzgzgVQGZBfGkho93nUTRMA2jTVaxfwnj-xVOkq32ng5C7mbg1Ztu7bm5VcFyLID7XGCcesDNLQBg3pbmDch93NfBXn2rwSWV9OB235mIDTsff4J1Ne3_O8ChTa7x1dFA"
        // console.log(token);
        // const headers = new HttpHeaders()
        //   .set('content-type', 'application/json')
        //   .set('Access-Control-Allow-Origin', '*')
        //   .set('X-Authorization', token);
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log(headers);
        return this._HTTP.get(environment_1.environment.baseUrl8080 + 'user-group/getByCompanyGroupId/12', { headers: { 'Content-Type': 'application/json', 'X-Authorization': token } });
        // .pipe(map((res: any) => {
        //   return res;
        // }));
    };
    //----------------user-group/getAllUserGroupsByCompanyGroups---------------
    UserRolesPermissionService.prototype.postUserGroupGetAllUserGroupsByCompanyGroups = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-group/getAllUserGroupsByCompanyGroups', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //----------------Post---user-group--Add-- update---------------
    UserRolesPermissionService.prototype.postUserGroupData = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-group', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //----------------Post---user-group/getAllDistinctByCompanyGroups---------------
    UserRolesPermissionService.prototype.postUserroupGetAllDistinctByCompanyGroups = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-group/getAllDistinctByCompanyGroups', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //----------------Post---Assign/UnAssign company group list---------------
    UserRolesPermissionService.prototype.postUserGroupGetAllCompanyGroupsByUserGroup = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-group/getAllCompanyGroupsByUserGroup', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //----------------Post---get Assigned Company GroupsByUserGroupName for pop up---------------
    UserRolesPermissionService.prototype.postUserGroupGetAssignedCompanyGroupsByUserGroupName = function (data) {
        return this._HTTP.post(environment_1.environment.baseUrl8080 + 'user-group/getAssignedCompanyGroupsByUserGroupName', data)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    UserRolesPermissionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserRolesPermissionService);
    return UserRolesPermissionService;
}());
exports.UserRolesPermissionService = UserRolesPermissionService;
