"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeemasterlistpageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var employeemasterlistpage_routing_module_1 = require("./employeemasterlistpage-routing.module");
var employeemasterlist_component_1 = require("./employeemasterlist/employeemasterlist.component");
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var employeemasterlistpage_component_1 = require("./employeemasterlistpage.component");
var EmployeemasterlistpageModule = /** @class */ (function () {
    function EmployeemasterlistpageModule() {
    }
    EmployeemasterlistpageModule = __decorate([
        core_1.NgModule({
            declarations: [employeemasterlist_component_1.EmployeemasterlistComponent, employeemasterlistpage_component_1.EmployeemasterlistpageComponent],
            imports: [
                common_1.CommonModule,
                employeemasterlistpage_routing_module_1.EmployeemasterlistpageRoutingModule,
                sharedlayout_module_1.SharedlayoutModule,
            ]
        })
    ], EmployeemasterlistpageModule);
    return EmployeemasterlistpageModule;
}());
exports.EmployeemasterlistpageModule = EmployeemasterlistpageModule;
