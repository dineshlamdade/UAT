"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HouserentsummaryComponent = void 0;
var core_1 = require("@angular/core");
var HouserentsummaryComponent = /** @class */ (function () {
    function HouserentsummaryComponent(houseRentService, numberFormat, alertService, modalService) {
        this.houseRentService = houseRentService;
        this.numberFormat = numberFormat;
        this.alertService = alertService;
        this.modalService = modalService;
        this.summaryGridData = [];
        this.tabIndex = 0;
        this.showData = false;
        this.myEvent = new core_1.EventEmitter();
        this.policyNumber = new core_1.EventEmitter();
        this.houseRentalMasterIds = new core_1.EventEmitter();
    }
    HouserentsummaryComponent.prototype.ngOnInit = function () {
        this.getComputationSummaryPage();
        // Summary get Call on Page Load
        this.summaryPage();
    };
    HouserentsummaryComponent.prototype.getComputationSummaryPage = function () {
        var _this = this;
        this.houseRentService.getComputation().subscribe(function (res) {
            if (res.data.results.length > 0) {
                _this.summaryGridData = res.data.results[0].houseRentalAllowanceComputationList;
                console.log("res::", res);
                _this.baseTotal = res.data.results[0].baseTotal;
                _this.arrearTotal = res.data.results[0].arrearTotal;
                _this.total = res.data.results[0].total;
                _this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
                _this.applicableAllowanceTotal =
                    res.data.results[0].applicableAllowanceTotal;
            }
        });
    };
    HouserentsummaryComponent.prototype.redirectToDeclarationActual = function (propertyName, mode) {
        this.tabIndex = 2;
        var data = {
            propertyHouseName: propertyName,
            tabIndex: this.tabIndex,
            canEdit: mode == 'edit' ? true : false
        };
        this.propertyName = propertyName;
        console.log('propertyName::', propertyName);
        console.log('propertyName::', propertyName);
        this.myEvent.emit(data);
    };
    // ---------------------Summary ----------------------
    // Summary get Call
    HouserentsummaryComponent.prototype.summaryPage = function () {
        var _this = this;
        this.houseRentService.gethouseRentSummary().subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.summaryGridData = res.data.results;
                _this.propertyName = res.data.results[0].propertyName;
                _this.fromDate = res.data.results[0].fromDate;
                _this.toDate = res.data.results[0].toDate;
                _this.actualAmount = res.data.results[0].actualAmount;
                _this.declaredAmount = res.data.results[0].declaredAmount;
                /*  this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
                    this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
                    this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount; */
                // console.log(res);
            }
        });
    };
    /*   jumpToMasterPage(propertyName: string) {
        this.tabIndex = 1;
        const data = {
          number: propertyName,
          tabIndex: this.tabIndex,
        };
        this.policyNumber.emit(data);
      } */
    HouserentsummaryComponent.prototype.jumpToMasterPage = function (houseRentalMasterId) {
        this.tabIndex = 1;
        var houseRentalMasterIds = {
            houseRentalMasterId: houseRentalMasterId,
            tabIndex: this.tabIndex
        };
        this.houseRentalMasterIds.emit(houseRentalMasterIds);
    };
    HouserentsummaryComponent.prototype.opencomputationModal = function (template1) {
        this.modalRef = this.modalService.show(template1, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    __decorate([
        core_1.Input()
    ], HouserentsummaryComponent.prototype, "propertyHouseName");
    __decorate([
        core_1.Output()
    ], HouserentsummaryComponent.prototype, "myEvent");
    __decorate([
        core_1.Output()
    ], HouserentsummaryComponent.prototype, "policyNumber");
    __decorate([
        core_1.Output()
    ], HouserentsummaryComponent.prototype, "houseRentalMasterIds");
    HouserentsummaryComponent = __decorate([
        core_1.Component({
            selector: 'app-houserentsummary',
            templateUrl: './houserentsummary.component.html',
            styleUrls: ['./houserentsummary.component.scss']
        })
    ], HouserentsummaryComponent);
    return HouserentsummaryComponent;
}());
exports.HouserentsummaryComponent = HouserentsummaryComponent;
