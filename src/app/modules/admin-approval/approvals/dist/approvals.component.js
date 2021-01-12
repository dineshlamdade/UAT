"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApprovalsComponent = void 0;
var core_1 = require("@angular/core");
var ApprovalsComponent = /** @class */ (function () {
    function ApprovalsComponent() {
        this.dropdownList = [];
        this.JFdropdownList = [];
        this.JF2dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.dropdownList1 = [];
        this.dropdownList3 = [];
    }
    ApprovalsComponent.prototype.ngOnInit = function () {
        this.dropdownList1 = [
            { id: 1, label: 'ABC' },
            { id: 2, label: 'PQR' },
            { id: 3, label: 'XYZ' },
            { id: 4, label: 'AAA' },
            { id: 5, label: 'BBB' }
        ];
        this.dropdownList3 = [
            { id: 1, label: 'House Rent' },
            { id: 2, label: 'Loan' },
            { id: 3, label: 'Chapter VI-A' },
            { id: 4, label: '80-C' }
        ];
        this.JFdropdownList = [
            { id: 1, label: 'Grade' },
            { id: 2, label: 'Department' },
        ];
        this.JF2dropdownList = [
            { id: 1, label: 'G1' },
            { id: 2, label: 'G2' },
            { id: 3, label: 'D1' },
            { id: 4, label: 'D2' },
            { id: 5, label: 'D3' }
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
    ApprovalsComponent.prototype.onItemSelect = function (item) {
        console.log(item);
    };
    ApprovalsComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    ApprovalsComponent = __decorate([
        core_1.Component({
            selector: 'app-approvals',
            templateUrl: './approvals.component.html',
            styleUrls: ['./approvals.component.scss']
        })
    ], ApprovalsComponent);
    return ApprovalsComponent;
}());
exports.ApprovalsComponent = ApprovalsComponent;
