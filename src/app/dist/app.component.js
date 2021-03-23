"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, activatedRoute, titleService, authService, translocoService, bnIdle) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.authService = authService;
        this.translocoService = translocoService;
        this.bnIdle = bnIdle;
        this.title = 'Delizia-HR';
        this.cyanClass = true;
        this.locales = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
            { label: 'Hindi', value: 'hi' },
        ];
        this.locale = this.locales[0].value;
        this.selectedLanguage = localStorage.getItem('selectedLanguage');
        // generate a regex from the locales we support
        if (this.selectedLanguage) {
            var supportedRegex = new RegExp('^' + this.locales.map(function (l) { return l.value.substring(0, 2); }).join('|^'));
            // check if the user's preferred language is supported and if so, use it.
            if (this.selectedLanguage.match(supportedRegex)) {
                this.updateLocale(this.selectedLanguage);
            }
        }
        this.bnIdle.startWatching(2).subscribe(function (res) {
            if (res) {
                // console.log("session expired"); commented by Anant
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.router.getCurrentNavigation() === null) {
            if (!this.authService.isLoggedIn()) {
                this.router.navigate(['/login']);
            }
            else {
                this.router.navigate(['/dashboard']);
            }
        }
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('offcanvas-active');
        body.classList.add('font-montserrat');
        sessionStorage.setItem('MinSideClass', '');
        sessionStorage.setItem('HeaderClass', 'top_dark');
        sessionStorage.setItem('MenuIcon', 'list-a');
        sessionStorage.setItem('Toggle', '');
        sessionStorage.setItem('Toggle2', '');
        sessionStorage.setItem('Toggle3', 'true');
        sessionStorage.setItem('Toggle4', '');
        sessionStorage.setItem('Toggle5', '');
        sessionStorage.setItem('Toggle6', '');
        sessionStorage.setItem('Toggle7', '');
        sessionStorage.setItem('Toggle8', '');
        sessionStorage.setItem('Toggle9', '');
        sessionStorage.setItem('Toggle10', '');
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function () {
            var rt = _this.getChild(_this.activatedRoute);
            rt.data.subscribe(function (data) {
                _this.titleService.setTitle(data.title);
            });
        });
        setTimeout(function () {
            document.getElementsByClassName('page-loader-wrapper')[0].classList.add('HideDiv');
        }, 1000);
    };
    AppComponent.prototype.getChild = function (activatedRoute) {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        }
        else {
            return activatedRoute;
        }
    };
    AppComponent.prototype.toggleThemeSetting = function () {
        var className = document.getElementsByClassName('themesetting')[0];
        className.classList.toggle('open');
    };
    AppComponent.prototype.closeMenu = function () {
        document.getElementsByClassName('right_sidebar')[0].classList.remove('open');
        document.getElementsByClassName('user_div')[0].classList.remove('open');
        document.getElementsByClassName('overlay')[0].classList.remove('open');
    };
    // change locale/language at runtime
    AppComponent.prototype.updateLocale = function (locale) {
        localStorage.setItem("selectedLanguage", locale);
        if (this.locales.some(function (l) { return l.value === locale; })) {
            this.locale = locale;
        }
        var lang = locale.substring(0, 2);
        this.translocoService.setActiveLang(lang);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
