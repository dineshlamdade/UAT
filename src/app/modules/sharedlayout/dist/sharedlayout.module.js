"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedlayoutModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var footer_component_1 = require("./footer/footer.component");
var header_component_1 = require("./header/header.component");
var leftmenu_component_1 = require("./leftmenu/leftmenu.component");
var router_1 = require("@angular/router");
var collapse_1 = require("ngx-bootstrap/collapse");
var transloco_loader_1 = require("./../../core/strategies/transloco.loader");
var transloco_1 = require("@ngneat/transloco");
var en_GB_1 = require("@angular/common/locales/en-GB");
var fr_1 = require("@angular/common/locales/fr");
var accordion_1 = require("primeng/accordion"); //accordion and accordion tab
common_1.registerLocaleData(fr_1["default"], 'fr');
common_1.registerLocaleData(en_GB_1["default"], 'en-GB');
var app_primeNG_module_1 = require("./../../app.primeNG.module");
var leftadminmenu_1 = require("./leftadminmenu/leftadminmenu");
var SharedlayoutModule = /** @class */ (function () {
    function SharedlayoutModule() {
    }
    SharedlayoutModule = __decorate([
        core_1.NgModule({
            declarations: [footer_component_1.FooterComponent, header_component_1.HeaderComponent, leftmenu_component_1.LeftmenuComponent, leftadminmenu_1.LeftadminmenuComponent],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                collapse_1.CollapseModule.forRoot(),
                transloco_1.TranslocoModule,
                accordion_1.AccordionModule,
                app_primeNG_module_1.PrimeNGModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                leftmenu_component_1.LeftmenuComponent,
                leftadminmenu_1.LeftadminmenuComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
            ],
            providers: [
                transloco_loader_1.translocoLoader,
                {
                    provide: transloco_1.TRANSLOCO_CONFIG,
                    useValue: {
                        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }],
                        listenToLangChange: true,
                        reRenderOnLangChange: true,
                        defaultLang: 'en',
                        fallbackLang: 'fr',
                        prodMode: false
                    }
                }
            ]
        })
    ], SharedlayoutModule);
    return SharedlayoutModule;
}());
exports.SharedlayoutModule = SharedlayoutModule;
