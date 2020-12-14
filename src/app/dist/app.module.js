"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
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
var angular_1 = require("@fullcalendar/angular"); // the main connector. must go first
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
common_1.registerLocaleData(fr_1["default"], 'fr');
common_1.registerLocaleData(en_GB_1["default"], 'en-GB');
var app_material_module_1 = require("./app.material.module");
var auth_guard_1 = require("./modules/auth/auth.guard");
var token_interceptor_service_1 = require("./modules/auth/token-interceptor/token-interceptor.service");
var dashboard_module_1 = require("./modules/dashboard/dashboard.module");
var payroll_module_1 = require("./modules/payroll/payroll.module");
var my_Investments_module_1 = require("./modules/my-Investments/my-Investments.module");
var other_master_module_1 = require("./modules/other-master/other-master.module");
var eighty_c_module_1 = require("./modules/my-Investments/80C/eighty-c.module");
var app_primeNG_module_1 = require("./app.primeNG.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                profile_component_1.ProfileComponent,
                settings_component_1.SettingsComponent,
            ],
            imports: [
                app_primeNG_module_1.PrimeNGModule,
                platform_browser_1.BrowserModule,
                auth_module_1.AuthModule,
                dashboard_module_1.DashboardModule,
                payroll_module_1.PayrollModule,
                my_Investments_module_1.MyInvestmentsModule,
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
                angular_1.FullCalendarModule,
                ckeditor5_angular_1.CKEditorModule,
                animations_1.BrowserAnimationsModule,
                transloco_1.TranslocoModule,
                app_material_module_1.DemoMaterialModule,
                app_routing_module_1.AppRoutingModule,
                dashboard_module_1.DashboardModule,
                my_Investments_module_1.MyInvestmentsModule,
                payroll_module_1.PayrollModule,
                other_master_module_1.OtherMasterModule
            ],
            providers: [datepicker_1.BsDatepickerModule,
                auth_guard_1.AuthGuard,
                transloco_loader_1.translocoLoader, {
                    provide: transloco_1.TRANSLOCO_CONFIG,
                    useValue: {
                        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }],
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
                },],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
