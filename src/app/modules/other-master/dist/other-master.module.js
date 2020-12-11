"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OtherMasterModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var other_master_routing_module_1 = require("./other-master-routing.module");
var forms_1 = require("@angular/forms");
var NumberFormatPipe_1 = require("../../core/utility/pipes/NumberFormatPipe");
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
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var slider_1 = require("@angular/material/slider");
var company_group_master_component_1 = require("./company-group-master/company-group-master.component");
var company_master_component_1 = require("./company-master/company-master.component");
var company_registration_details_component_1 = require("./company-registration-details/company-registration-details.component");
var compliance_head_component_1 = require("./compliance-head/compliance-head.component");
var statutory_compliance_component_1 = require("./statutory-compliance/statutory-compliance.component");
var establishment_master_component_1 = require("./establishment-master/establishment-master.component");
var compliance_master_component_1 = require("./compliance-master/compliance-master.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var OtherMasterModule = /** @class */ (function () {
    function OtherMasterModule() {
    }
    OtherMasterModule = __decorate([
        core_1.NgModule({
            declarations: [
                company_group_master_component_1.CompanyGroupMasterComponent,
                company_master_component_1.CompanyMasterComponent,
                company_registration_details_component_1.CompanyRegistrationDetailsComponent,
                compliance_head_component_1.ComplianceHeadComponent,
                statutory_compliance_component_1.StatutoryComplianceComponent,
                establishment_master_component_1.EstablishmentMasterComponent,
                compliance_master_component_1.ComplianceMasterComponent,
            ],
            imports: [
                common_1.CommonModule,
                other_master_routing_module_1.OtherMasterRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
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
                carousel_1.CarouselModule.forRoot(),
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: 'toast-top-center'
                }),
                sharedlayout_module_1.SharedlayoutModule,
                other_master_routing_module_1.OtherMasterRoutingModule,
            ],
            providers: [common_1.DatePipe, NumberFormatPipe_1.NumberFormatPipe]
        })
    ], OtherMasterModule);
    return OtherMasterModule;
}());
exports.OtherMasterModule = OtherMasterModule;
