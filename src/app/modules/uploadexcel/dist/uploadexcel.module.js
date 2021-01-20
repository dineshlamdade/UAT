"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadexcelModule = void 0;
var upload_excel_home_service_1 = require("./uploadexcelhome/upload-excel-home.service");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var uploadexcel_component_1 = require("./uploadexcel.component");
var uploadexcel_routing_module_1 = require("./uploadexcel-routing.module");
var uploadexcelhome_component_1 = require("./uploadexcelhome/uploadexcelhome.component");
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var panelmenu_1 = require("primeng/panelmenu");
var scrollpanel_1 = require("primeng/scrollpanel");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var forms_1 = require("@angular/forms");
var excel_service_1 = require("./uploadexcelhome/excel.service");
var UploadexcelModule = /** @class */ (function () {
    function UploadexcelModule() {
    }
    UploadexcelModule = __decorate([
        core_1.NgModule({
            declarations: [uploadexcel_component_1.UploadexcelComponent,
                uploadexcelhome_component_1.UploadexcelhomeComponent
            ],
            imports: [
                common_1.CommonModule,
                uploadexcel_routing_module_1.UploadexcelRoutingModule,
                sharedlayout_module_1.SharedlayoutModule,
                panelmenu_1.PanelMenuModule,
                scrollpanel_1.ScrollPanelModule,
                tooltip_1.TooltipModule.forRoot(),
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule
            ],
            providers: [excel_service_1.ExcelService,
                upload_excel_home_service_1.UploadExcelHomeService,
            ]
        })
    ], UploadexcelModule);
    return UploadexcelModule;
}());
exports.UploadexcelModule = UploadexcelModule;
