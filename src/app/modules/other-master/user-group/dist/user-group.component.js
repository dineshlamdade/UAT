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
var forms_1 = require("@angular/forms");
var UserGroupComponent = /** @class */ (function () {
    function UserGroupComponent(modalService, service, formBuilder) {
        this.modalService = modalService;
        this.service = service;
        this.formBuilder = formBuilder;
        this.userGroupId = null;
        this.assignGroupData = [];
        this.form = this.formBuilder.group({
            companyGroupMasterId: new forms_1.FormControl(''),
            userGroupId: new forms_1.FormControl(''),
            groupName: new forms_1.FormControl(null, forms_1.Validators.required),
            groupDescription: new forms_1.FormControl(null, forms_1.Validators.required),
            "default": new forms_1.FormControl(''),
            isActive: new forms_1.FormControl(1),
            remark: new forms_1.FormControl(null)
        });
    }
    UserGroupComponent.prototype.ngOnInit = function () {
        this.userGridData = [
            { srno: '1', groupName: 'System Admin', groupDescription: 'System Admin Desc' },
            { srno: '2', groupName: 'DB Admin', groupDescription: 'DB Admin Desc' },
            { srno: '3', groupName: 'Paysquare Admin', groupDescription: 'Paysquare Admin Desc' },
            { srno: '4', groupName: 'App_Admin', groupDescription: 'App_Admin Desc' },
        ];
        this.assigndata = [
            { companyGroupCode: '854332', shortName: 'Eaton', companyGroupName: 'Eaton Pvt Ltd' },
            { companyGroupCode: '223434', shortName: 'TCS', companyGroupName: 'Tata' },
            { companyGroupCode: '654564', shortName: 'Abbott', companyGroupName: 'Abbott Pvt ltd' },
            { companyGroupCode: '675876', shortName: 'Schindler', companyGroupName: 'Schindler Pvt ltd' },
        ];
        this.Grplistdata = [{ groupName: 'Paysquare1' },
            { groupName: 'Paysquare2' },
            { groupName: 'Paysquare3' },
            { groupName: 'Paysquare4' },
            { groupName: 'Paysquare5' },
            { groupName: 'Paysquare6' },
            { groupName: 'Paysquare7' },
            { groupName: 'Paysquare8' },
            { groupName: 'Paysquare9' }];
        this.summaryPage();
    };
    // Summary get Call
    UserGroupComponent.prototype.summaryPage = function () {
        var _this = this;
        this.userGridData = [];
        this.service.getAllUserGroupData().subscribe(function (res) {
            console.log('userGridData::', res);
            _this.userGridData = res.data.results;
            console.log('userGridData::', _this.userGridData);
        });
    };
    UserGroupComponent.prototype.save = function () {
        var _this = this;
        console.log('clcicked on new record save button');
        var companyId = [];
        // companyId.push(Number(this.form.get('companyGroupMasterIds').value))
        // const data = {
        //         userGroupId: this.form.get('userGroupId').value,
        //         groupName: this.form.get('groupName').value,
        //         groupDescription:this.form.get('groupDescription').value,
        //          companyGroupMasterIds: companyId,
        //         default:this.form.get('default').value,
        //         isActive:this.form.get('isActive').value,
        //         remark:this.form.get('remark').value,
        //         userGroupId: 6085,
        //         groupName: "IT Support",
        //         groupDescription:"IT Support",
        //          companyGroupMasterIds: 12,
        //         default:true,
        //         isActive:true,
        //         remark:null,
        // }
        var data = {
            "groupName": this.form.controls['groupName'].value,
            "groupDescription": this.form.controls['groupDescription'].value,
            "companyGroupMasterIds": [
                {
                    "userGroupId": this.userGroupId,
                    "companyGroupMasterId": 12,
                    "active": true
                },
            ],
            "remark": null,
            "active": true,
            "default": false
        };
        console.log(JSON.stringify(data));
        this.service.postUserGroupData(data).subscribe(function (res) {
            console.log("before save", data);
            //  this.alertService.sweetalertMasterSuccess( "User Group data save successfully", "" );
            _this.summaryPage();
            _this.form.reset();
        });
    };
    UserGroupComponent.prototype.editUserGroup = function (summary) {
        this.form.controls['groupName'].setValue(summary.groupName),
            this.form.controls['groupDescription'].setValue(summary.groupDescription);
        this.userGroupId = summary.userGroupId;
        this.form.enable();
    };
    UserGroupComponent.prototype.resetForm = function () {
        this.form.reset();
        this.form.enable();
    };
    UserGroupComponent.prototype.viewUserGroup = function (summary) {
        this.form.controls['groupName'].setValue(summary.groupName),
            this.form.controls['groupDescription'].setValue(summary.groupDescription);
        this.userGroupId = summary.userGroupId;
        this.form.disable();
    };
    UserGroupComponent.prototype.AssignedGroup = function (template, id, headname) {
        var _this = this;
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-lg' }));
        this.userGroupName = this.form.controls['groupName'].value;
        var data = {
            "userGroupName": "IT Support",
            "listCompanyGroupIds": [12]
        };
        //this.companyGroupName =  headname;
        this.service.postUserGroupGetAllCompanyGroupsByUserGroup(data).subscribe(function (res) {
            console.log("AssignedGroupCompanyData", res);
            _this.assignGroupData = res.data.results;
        });
    };
    UserGroupComponent.prototype.Grouplist = function (template2, gName) {
        var _this = this;
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-md' }));
        this.userGroupList = gName;
        var data = {
            "userGroupName": "IT Support",
            "listCompanyGroupIds": [12]
        };
        this.service.postUserGroupGetAssignedCompanyGroupsByUserGroupName(data).subscribe(function (res) {
            console.log("AssignedGroupCompanyNamePopUp", res);
            _this.Grplistdata = res.data.results;
        });
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
