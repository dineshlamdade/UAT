"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadexcelhomeComponent = void 0;
var core_1 = require("@angular/core");
var UploadexcelhomeComponent = /** @class */ (function () {
    function UploadexcelhomeComponent(modalService) {
        this.modalService = modalService;
        this.preview = false;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.dropdownList1 = [];
    }
    UploadexcelhomeComponent.prototype.ngOnInit = function () {
        this.dropdownList = [
            { id: 1, label: 'PA_01_Staff' },
            { id: 2, label: 'PA_02_Worker' }
        ];
        this.dropdownList1 = [
            { id: 1, label: 'Employee Master' },
            { id: 2, label: 'Payroll' },
            { id: 3, label: 'Leave Management' },
            { id: 4, label: 'Expense Reimbursement ' },
            { id: 5, label: 'Assets ' },
        ];
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'label',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
    };
    UploadexcelhomeComponent.prototype.onItemSelect = function (item, DeselectTab) {
        this.modalRef = this.modalService.show(DeselectTab, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    UploadexcelhomeComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    UploadexcelhomeComponent.prototype.MergeTab = function (template3) {
        this.modalRef = this.modalService.show(template3, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UploadexcelhomeComponent.prototype.DeselectTab = function (DeselectTab) {
        this.modalRef = this.modalService.show(DeselectTab, Object.assign({}, { "class": 'gray modal-lg' }));
    };
    UploadexcelhomeComponent.prototype.DownloadCriteria = function (template2) {
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UploadexcelhomeComponent.prototype.displayPreview = function () {
        this.preview = true;
    };
    UploadexcelhomeComponent = __decorate([
        core_1.Component({
            selector: 'app-uploadexcelhome',
            templateUrl: './uploadexcelhome.component.html',
            styleUrls: ['./uploadexcelhome.component.scss']
        })
    ], UploadexcelhomeComponent);
    return UploadexcelhomeComponent;
}());
exports.UploadexcelhomeComponent = UploadexcelhomeComponent;
