"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserGroupComponent = void 0;
var core_1 = require("@angular/core");
var UserGroupComponent = /** @class */ (function () {
    function UserGroupComponent(modalService) {
        this.modalService = modalService;
    }
    UserGroupComponent.prototype.ngOnInit = function () {
        this.data = [
            { srno: '1', usergrup: 'System Admin', desc: 'System Admin Desc' },
            { srno: '2', usergrup: 'DB Admin', desc: 'DB Admin Desc' },
            { srno: '3', usergrup: 'Paysquare Admin', desc: 'Paysquare Admin Desc' },
            { srno: '4', usergrup: 'App_Admin', desc: 'App_Admin Desc' },
        ];
        this.assigndata = [
            { grupcode: '854332', shrtname: 'Eaton', grupname: 'Eaton Pvt Ltd' },
            { grupcode: '223434', shrtname: 'TCS', grupname: 'Tata' },
            { grupcode: '654564', shrtname: 'Abbott', grupname: 'Abbott Pvt ltd' },
            { grupcode: '675876', shrtname: 'Schindler', grupname: 'Schindler Pvt ltd' },
        ];
        this.Grplistdata = [{ grupnm: 'Paysquare1' },
            { grupnm: 'Paysquare2' },
            { grupnm: 'Paysquare3' },
            { grupnm: 'Paysquare4' },
            { grupnm: 'Paysquare5' },
            { grupnm: 'Paysquare6' },
            { grupnm: 'Paysquare7' },
            { grupnm: 'Paysquare8' },
            { grupnm: 'Paysquare9' }];
    };
    UserGroupComponent.prototype.AssignedGroup = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-lg' }));
    };
    UserGroupComponent.prototype.Grouplist = function (template2) {
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UserGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-user-group',
            templateUrl: './user-group.component.html',
            styleUrls: ['./user-group.component.scss']
        })
    ], UserGroupComponent);
    return UserGroupComponent;
}());
exports.UserGroupComponent = UserGroupComponent;
