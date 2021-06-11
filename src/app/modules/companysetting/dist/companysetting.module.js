"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySettingModule = void 0;
var attribute_dependency_component_1 = require("./attribute-dependency/attribute-dependency.component");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
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
var NumberFormatPipe_1 = require("../../core/utility/pipes/NumberFormatPipe");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var slider_1 = require("@angular/material/slider");
var attribute_creation_component_1 = require("./attribute-creation/attribute-creation.component");
var companysetting_routing_module_1 = require("./companysetting.routing.module");
var table_1 = require("primeng/table");
var button_1 = require("primeng/button");
var calendar_1 = require("primeng/calendar");
var slider_2 = require("primeng/slider");
var dialog_1 = require("primeng/dialog");
var multiselect_1 = require("primeng/multiselect");
var contextmenu_1 = require("primeng/contextmenu");
var toast_1 = require("primeng/toast");
var inputtext_1 = require("primeng/inputtext");
var progressbar_2 = require("primeng/progressbar");
var business_year_component_1 = require("./business-cycle/business-year/business-year.component");
var cycle_definition_component_1 = require("./business-cycle/cycle-definition/cycle-definition.component");
var cycle_creation_component_1 = require("./business-cycle/cycle-creation/cycle-creation.component");
var business_cycle_component_1 = require("./business-cycle/business-cycle.component");
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var attribute_selection_component_1 = require("./attribute-selection/attribute-selection.component");
var head_creation_component_1 = require("./head-creation/head-creation.component");
var attribute_global_component_1 = require("./attribute-global/attribute-global.component");
var payroll_head_group_creation_component_1 = require("./payroll-head-group-creation/payroll-head-group-creation.component");
var CompanySettingModule = /** @class */ (function () {
    function CompanySettingModule() {
    }
    CompanySettingModule = __decorate([
        core_1.NgModule({
            declarations: [
                head_creation_component_1.HeadCreationComponent,
                //   PayrollHeadGroupCreationComponent,
                payroll_head_group_creation_component_1.PayrollHeadGroupCreationComponent,
                business_cycle_component_1.BusinessCycleComponent,
                attribute_selection_component_1.AttributeSelectionComponent,
                attribute_creation_component_1.AttributeCreationComponent,
                business_year_component_1.BusinessYearComponent,
                cycle_definition_component_1.CycleDefinitionComponent,
                cycle_creation_component_1.CycleCreationComponent,
                attribute_global_component_1.AttributeGlobalComponent,
                attribute_dependency_component_1.AttributeDependencyComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                slider_1.MatSliderModule,
                tooltip_1.TooltipModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                collapse_1.CollapseModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                alert_1.AlertModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: 'toast-top-center'
                }),
                sharedlayout_module_1.SharedlayoutModule,
                companysetting_routing_module_1.CompanySettingRoutingModule,
                table_1.TableModule,
                calendar_1.CalendarModule,
                slider_2.SliderModule,
                dialog_1.DialogModule,
                multiselect_1.MultiSelectModule,
                contextmenu_1.ContextMenuModule,
                button_1.ButtonModule,
                toast_1.ToastModule,
                inputtext_1.InputTextModule,
                progressbar_2.ProgressBarModule,
            ],
            providers: [common_1.DatePipe, NumberFormatPipe_1.NumberFormatPipe]
        })
    ], CompanySettingModule);
    return CompanySettingModule;
}());
exports.CompanySettingModule = CompanySettingModule;
