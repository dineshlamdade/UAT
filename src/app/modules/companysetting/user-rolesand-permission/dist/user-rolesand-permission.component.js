"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRolesandPermissionComponent = void 0;
var core_1 = require("@angular/core");
var UserRolesandPermissionComponent = /** @class */ (function () {
    function UserRolesandPermissionComponent() {
        this.tabIndex = 0;
    }
    UserRolesandPermissionComponent.prototype.ngOnInit = function () {
    };
    UserRolesandPermissionComponent.prototype.changeTabIndexForRedirect = function (event) {
        this.tabIndex = event.tabIndex;
        this.data = event;
        console.log('data::', this.data);
    };
    UserRolesandPermissionComponent.prototype.redirectToMaster = function (event) {
        this.tabIndex = event.tabIndex;
        this.policyNumber = event;
    };
    UserRolesandPermissionComponent.prototype.changeTabIndex = function (index) {
        if (index !== 2) {
            this.data = undefined;
        }
        this.tabIndex = index;
    };
    UserRolesandPermissionComponent.prototype.onWindowScroll = function () {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
            document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    };
    UserRolesandPermissionComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    };
    __decorate([
        core_1.HostListener('window:scroll', [])
    ], UserRolesandPermissionComponent.prototype, "onWindowScroll");
    UserRolesandPermissionComponent = __decorate([
        core_1.Component({
            selector: 'app-user-rolesand-permission',
            templateUrl: './user-rolesand-permission.component.html',
            styleUrls: ['./user-rolesand-permission.component.scss']
        })
    ], UserRolesandPermissionComponent);
    return UserRolesandPermissionComponent;
}());
exports.UserRolesandPermissionComponent = UserRolesandPermissionComponent;
