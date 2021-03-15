"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var chapterVIA_module_1 = require("./modules/my-Investments/VI-A/chapterVIA.module");
var other_master_module_1 = require("./modules/other-master/other-master.module");
var drag_drop_1 = require("@angular/cdk/drag-drop");
// transloco
// import your locales
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var en_GB_1 = require("@angular/common/locales/en-GB");
var fr_1 = require("@angular/common/locales/fr");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var slider_1 = require("@angular/material/slider");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var ckeditor5_angular_1 = require("@ckeditor/ckeditor5-angular");
// import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
var transloco_1 = require("@ngneat/transloco");
var angular_calendar_1 = require("angular-calendar");
var date_fns_1 = require("angular-calendar/date-adapters/date-fns");
var angular_count_to_1 = require("angular-count-to");
var ng_apexcharts_1 = require("ng-apexcharts");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var ngx_toastr_1 = require("ngx-toastr");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var transloco_loader_1 = require("./core/strategies/transloco.loader");
var auth_module_1 = require("./modules/auth/auth.module");
var profile_component_1 = require("./modules/profile/profile.component");
var profile_module_1 = require("./modules/profile/profile.module");
var settings_component_1 = require("./modules/settings/settings.component");
var settings_module_1 = require("./modules/settings/settings.module");
var bn_ng_idle_1 = require("bn-ng-idle");
common_1.registerLocaleData(fr_1["default"], 'fr');
common_1.registerLocaleData(en_GB_1["default"], 'en-GB');
var app_material_module_1 = require("./app.material.module");
var auth_guard_1 = require("./modules/auth/auth.guard");
var token_interceptor_service_1 = require("./modules/auth/token-interceptor/token-interceptor.service");
var dashboard_module_1 = require("./modules/dashboard/dashboard.module");
var employee_master_module_1 = require("./modules/employee-master/employee-master.module");
var eighty_c_module_1 = require("./modules/my-Investments/80C/eighty-c.module");
var my_Investments_module_1 = require("./modules/my-Investments/my-Investments.module");
var payroll_module_1 = require("./modules/payroll/payroll.module");
var admin_approval_module_1 = require("./modules/admin-approval/admin-approval.module");
var uploadexcel_module_1 = require("./modules/uploadexcel/uploadexcel.module");
var employeemasterlistpage_module_1 = require("./modules/employeemasterlistpage/employeemasterlistpage.module");
//////////////////////addaed by bharati////
//import { payrollModule } from './modules/companysetting/payroll/payroll.module';
//import { CompanySettingModule } from './modules/companysetting/companysetting.module';
//import { payrollComponent } from './modules/companysetting/payroll/payroll.component';
var shorten_string_pipe_1 = require("./core/utility/pipes/shorten-string.pipe");
var companysetting_module_1 = require("./modules/companysetting/companysetting.module");
////////////////////////////////////
var app_primeNG_module_1 = require("./app.primeNG.module");
var accordion_1 = require("primeng/accordion");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                profile_component_1.ProfileComponent,
                shorten_string_pipe_1.ShortenStringPipe,
                settings_component_1.SettingsComponent,
            ],
            exports: [],
            imports: [
                platform_browser_1.BrowserModule,
                auth_module_1.AuthModule,
                app_primeNG_module_1.PrimeNGModule,
                accordion_1.AccordionModule,
                dashboard_module_1.DashboardModule,
                payroll_module_1.PayrollModule,
                /////////////////
                //  payrollModule,
                companysetting_module_1.CompanySettingModule,
                ////////////////////////////////
                my_Investments_module_1.MyInvestmentsModule,
                chapterVIA_module_1.investmentChapterVIAModule,
                eighty_c_module_1.EightyCModule,
                profile_module_1.ProfileModule,
                settings_module_1.SettingsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                drag_drop_1.DragDropModule,
                slider_1.MatSliderModule,
                ng_apexcharts_1.NgApexchartsModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                angular_count_to_1.CountToModule,
                ngx_toastr_1.ToastrModule.forRoot({}),
                angular_calendar_1.CalendarModule.forRoot({
                    provide: angular_calendar_1.DateAdapter,
                    useFactory: date_fns_1.adapterFactory
                }),
                ckeditor5_angular_1.CKEditorModule,
                animations_1.BrowserAnimationsModule,
                transloco_1.TranslocoModule,
                app_material_module_1.DemoMaterialModule,
                app_routing_module_1.AppRoutingModule,
                dashboard_module_1.DashboardModule,
                my_Investments_module_1.MyInvestmentsModule,
                payroll_module_1.PayrollModule,
                employee_master_module_1.EmployeeMasterModule,
                app_primeNG_module_1.PrimeNGModule,
                accordion_1.AccordionModule,
                other_master_module_1.OtherMasterModule,
                admin_approval_module_1.AdminApprovalModule,
                uploadexcel_module_1.UploadexcelModule,
                employeemasterlistpage_module_1.EmployeemasterlistpageModule,
            ],
            providers: [datepicker_1.BsDatepickerModule,
                bn_ng_idle_1.BnNgIdleService,
                auth_guard_1.AuthGuard,
                transloco_loader_1.translocoLoader, {
                    provide: transloco_1.TRANSLOCO_CONFIG,
                    useValue: {
                        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }, { id: 'hi', label: 'Hindi' }],
                        listenToLangChange: true,
                        reRenderOnLangChange: true,
                        defaultLang: 'en',
                        fallbackLang: 'fr',
                        prodMode: false
                    }
                }, {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_service_1.TokenInterceptorService,
                    multi: true
                },
                shorten_string_pipe_1.ShortenStringPipe,],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
