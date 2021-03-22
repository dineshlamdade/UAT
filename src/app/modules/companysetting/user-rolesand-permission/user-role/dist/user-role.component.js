"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRoleComponent = void 0;
var core_1 = require("@angular/core");
var UserRoleComponent = /** @class */ (function () {
    function UserRoleComponent(modalService) {
        this.modalService = modalService;
    }
    UserRoleComponent.prototype.ngOnInit = function () {
        this.data = [
            { srno: '1', usergrup: 'HR_Admin', userrole: 'HR_Operation', desc: 'HR_Operation', userrole1: 'HR_Manager', desc1: 'HR_Manager' },
            { srno: '2', usergrup: 'Account_Admin', userrole: 'Account_Operation', desc: 'Account_Operation', userrole1: '', desc1: '' },
            { srno: '3', usergrup: 'IT_Admin', userrole: 'IT_Operation', desc: 'Paysquare Admin Desc', userrole1: '', desc1: '' }
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
    UserRoleComponent.prototype.Grouplist = function (template2) {
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UserRoleComponent = __decorate([
        core_1.Component({
            selector: 'app-user-role',
            templateUrl: './user-role.component.html',
            styleUrls: ['./user-role.component.scss']
        })
    ], UserRoleComponent);
    return UserRoleComponent;
}());
exports.UserRoleComponent = UserRoleComponent;
