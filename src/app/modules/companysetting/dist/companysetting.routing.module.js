"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySettingRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var attribute_creation_component_1 = require("./attribute-creation/attribute-creation.component");
var business_cycle_component_1 = require("./business-cycle/business-cycle.component");
var head_creation_component_1 = require("./head-creation/head-creation.component");
var attribute_selection_component_1 = require("./attribute-selection/attribute-selection.component");
var payroll_head_group_creation_component_1 = require("./payroll-head-group-creation/payroll-head-group-creation.component");
var routes = [
    {
        path: '',
        children: [
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
                path: 'attribute-selection',
                component: attribute_selection_component_1.AttributeSelectionComponent,
                data: { title: ':: Epic :: Company Settings' }
            },
            {
                path: 'payroll-head-group-creation',
                component: payroll_head_group_creation_component_1.PayrollHeadGroupCreationComponent,
                data: { title: ':: Epic :: Company Settings' }
            },
        ]
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
