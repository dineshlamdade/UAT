"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySettingRoutingModule = void 0;
var attribute_dependency_component_1 = require("./attribute-dependency/attribute-dependency.component");
var garnishment_master_component_1 = require("./payroll/garnishment-master/garnishment-master.component");
var attribute_creation_component_1 = require("./attribute-creation/attribute-creation.component");
var business_cycle_component_1 = require("./business-cycle/business-cycle.component");
var head_creation_component_1 = require("./head-creation/head-creation.component");
var payroll_head_group_creation_component_1 = require("./payroll-head-group-creation/payroll-head-group-creation.component");
var user_rolesand_permission_component_1 = require("./user-rolesand-permission/user-rolesand-permission.component");
var role_privilege_component_1 = require("./user-rolesand-permission/role-privilege/role-privilege.component");
var reimbursement_master_component_1 = require("./reimbursement-master/reimbursement-master.component");
var register_form_component_1 = require("./register-form/register-form.component");
var summary_form_component_1 = require("./summary-form/summary-form.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var claim_form_component_1 = require("./claim-form/claim-form.component");
var declaration_form_component_1 = require("./declaration-form/declaration-form.component");
var attribute_global_component_1 = require("./attribute-global/attribute-global.component");
var routes = [
    {
        path: 'business-cycle',
        component: business_cycle_component_1.BusinessCycleComponent,
        data: { title: ':: Epic :: Company Settings ' }
    },
    {
        path: 'head-creation',
        component: head_creation_component_1.HeadCreationComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'attribute-creation',
        component: attribute_creation_component_1.AttributeCreationComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'attribute-group',
        component: attribute_global_component_1.AttributeGlobalComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'payroll-head-group-creation',
        component: payroll_head_group_creation_component_1.PayrollHeadGroupCreationComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'Garnishment-Master',
        component: garnishment_master_component_1.GarnishmentMasterComponent,
        data: { title: ':: Garnishment-Master' }
    },
    {
        path: 'userrolesandpermission',
        component: user_rolesand_permission_component_1.UserRolesandPermissionComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'roleprivilege',
        component: role_privilege_component_1.RolePrivilegeComponent,
        data: { title: ':: Epic :: Company Settings' }
    },
    {
        path: 'reimbursement',
        component: reimbursement_master_component_1.ReimbursementMasterComponent,
        data: { title: 'Reimbursement :: Company Setting' }
    },
    {
        path: 'registerForm',
        component: register_form_component_1.RegisterFormComponent,
        data: { title: 'Register-Form :: Company Setting' }
    },
    {
        path: 'summaryForm',
        component: summary_form_component_1.SummaryFormComponent,
        data: { title: 'Summary-Form :: Company Setting' }
    },
    {
        path: 'claimForm',
        component: claim_form_component_1.ClaimFormComponent,
        data: { title: 'Claim-Form :: Company Setting' }
    },
    {
        path: 'declarationForm',
        component: declaration_form_component_1.DeclarationFormComponent,
        data: { title: 'Declaration-Message :: Company Setting' }
    },
    {
        path: 'attribute-global',
        component: attribute_global_component_1.AttributeGlobalComponent,
        data: { title: ':: Epic :: Company Setting' }
    },
    {
        path: 'attribute-dependency',
        component: attribute_dependency_component_1.AttributeDependencyComponent,
        data: { title: ':: Epic :: Company Setting' }
    },
];
var CompanySettingRoutingModule = /** @class */ (function () {
    function CompanySettingRoutingModule() {
    }
    CompanySettingRoutingModule.components = [];
    CompanySettingRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CompanySettingRoutingModule);
    return CompanySettingRoutingModule;
}());
exports.CompanySettingRoutingModule = CompanySettingRoutingModule;
