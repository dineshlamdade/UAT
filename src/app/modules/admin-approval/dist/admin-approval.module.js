"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminApprovalModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var admin_approval_routing_module_1 = require("./admin-approval-routing.module");
var admin_dashboard_component_1 = require("./admin-dashboard/admin-dashboard.component");
var forms_1 = require("@angular/forms");
var accordion_1 = require("ngx-bootstrap/accordion");
var alert_1 = require("ngx-bootstrap/alert");
var carousel_1 = require("ngx-bootstrap/carousel");
var collapse_1 = require("ngx-bootstrap/collapse");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var modal_1 = require("ngx-bootstrap/modal");
var popover_1 = require("ngx-bootstrap/popover");
var progressbar_1 = require("ngx-bootstrap/progressbar");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_toastr_1 = require("ngx-toastr");
var slider_1 = require("@angular/material/slider");
var approvals_component_1 = require("./approvals/approvals.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var picklist_1 = require("primeng/picklist");
var AdminApprovalModule = /** @class */ (function () {
    function AdminApprovalModule() {
    }
    AdminApprovalModule = __decorate([
        core_1.NgModule({
            declarations: [admin_dashboard_component_1.AdminDashboardComponent, approvals_component_1.ApprovalsComponent],
            imports: [
                common_1.CommonModule,
                sharedlayout_module_1.SharedlayoutModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                picklist_1.PickListModule,
                forms_1.FormsModule,
                slider_1.MatSliderModule,
                tooltip_1.TooltipModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                collapse_1.CollapseModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                alert_1.AlertModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: 'toast-top-center'
                }),
                sharedlayout_module_1.SharedlayoutModule,
                admin_approval_routing_module_1.AdminApprovalRoutingModule,
            ]
        })
    ], AdminApprovalModule);
    return AdminApprovalModule;
}());
exports.AdminApprovalModule = AdminApprovalModule;
