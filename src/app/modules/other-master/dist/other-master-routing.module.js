"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OtherMasterRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import { CompanyMasterComponent } from '../create-company/company-master/company-master.component';
var company_group_master_component_1 = require("./company-group-master/company-group-master.component");
var company_master_component_1 = require("./company-master/company-master.component");
var company_registration_details_component_1 = require("./company-registration-details/company-registration-details.component");
var compliance_head_component_1 = require("./compliance-head/compliance-head.component");
var compliance_master_component_1 = require("./compliance-master/compliance-master.component");
var establishment_master_component_1 = require("./establishment-master/establishment-master.component");
var statutory_compliance_component_1 = require("./statutory-compliance/statutory-compliance.component");
var routes = [
    {
        path: 'companyGroupMaster',
        component: company_group_master_component_1.CompanyGroupMasterComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'companyMaster',
        component: company_master_component_1.CompanyMasterComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'companyRegistrationDetails',
        component: company_registration_details_component_1.CompanyRegistrationDetailsComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'complianceHead',
        component: compliance_head_component_1.ComplianceHeadComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'statutoryCompliance',
        component: statutory_compliance_component_1.StatutoryComplianceComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'establishmentMaster',
        component: establishment_master_component_1.EstablishmentMasterComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
    {
        path: 'complianceMaster',
        component: compliance_master_component_1.ComplianceMasterComponent,
        data: { title: ':: Delizia-HR :: Home' }
    },
];
var OtherMasterRoutingModule = /** @class */ (function () {
    function OtherMasterRoutingModule() {
    }
    OtherMasterRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], OtherMasterRoutingModule);
    return OtherMasterRoutingModule;
}());
exports.OtherMasterRoutingModule = OtherMasterRoutingModule;
