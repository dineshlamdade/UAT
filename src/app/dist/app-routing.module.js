"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
    { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
    { path: '', loadChildren: './modules/payroll/payroll.module#PayrollModule' },
    { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
    { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
    { path: 'investment',
        loadChildren: './modules/my-Investments/my-Investments.module#MyInvestmentsModule' },
    { path: 'otherMaster',
        loadChildren: './modules/other-master/other-master.module#OtherMasterModule' },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { path: '**', redirectTo: '/dashboard' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
