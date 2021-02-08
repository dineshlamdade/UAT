"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.LeftmenuComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("src/app/app.component");
var LeftmenuComponent = /** @class */ (function () {
    function LeftmenuComponent(router, app, EventEmitterService) {
        this.router = router;
        this.app = app;
        this.EventEmitterService = EventEmitterService;
        this.isCollapsed = true;
        this.isEmployeeMaster = true;
        this.isProjectCollapsed = true;
        this.isJobportalCollapsed = true;
        this.isInvestmentCollapsed = true;
        this.isOtherMaster = true;
        this.isUploadExcel = true;
        this.isAuthCollapsed = true;
        this.isStaticticsCollapsed = true;
        this.isFriendsCollapsed = true;
        this.isCollapsedLMS = true;
        this.isCollapsedWorkflowSettings = true;
        this.chatTab = true;
        this.toggle3 = true;
        this.staticscard = true;
        this.friendscard = true;
        this.ischaptersettingCollapsed = true;
        if ((this.router.url).includes('payroll')) {
            this.isCollapsed = false;
        }
        if ((this.router.url).includes('investment')) {
            this.isInvestmentCollapsed = false;
        }
        if ((this.router.url).includes('otherMaster')) {
            this.isOtherMaster = false;
        }
        if ((this.router.url).includes('auth')) {
            this.isAuthCollapsed = false;
        }
        if ((this.router.url).includes('uploadexcel')) {
            this.isUploadExcel = false;
        }
        if ((this.router.url).includes('companysetting')) {
            this.ischaptersettingCollapsed = false;
        }
        if ((this.router.url).includes('employee-master')) {
            this.isEmployeeMaster = false;
        }
    }
    LeftmenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuDetails = [{
                collapsed: false,
                icon: 'icon-rocket',
                name: 'Dashboard',
                routerlink: '/dashboard'
            },
            ////////////////////
            {
                collapsed: true,
                icon: 'icon-credit-card',
                name: 'Company Settings',
                subDetails: [{
                        name: 'payroll',
                        routerlink: '/companysetting/payroll'
                    },
                ]
            },
            //////////////////////////////
            {
                collapsed: true,
                icon: 'icon-credit-card',
                name: 'Investment',
                subDetails: [{
                        name: '80C-LIC',
                        routerlink: '/investment/80C-LIC'
                    },
                    {
                        name: '80C-PPF',
                        routerlink: '/otherMaster/companyRegistrationDetails'
                    },
                    {
                        name: 'Compliance Head',
                        routerlink: '/otherMaster/complianceHead'
                    }]
            },
            {
                collapsed: true,
                icon: 'icon-rocket',
                name: 'Other Master',
                subDetails: [{
                        name: 'Company Group Master',
                        routerlink: '/otherMaster/companyGroupMaster'
                    },
                    {
                        name: 'Company Registration Details',
                        routerlink: '/otherMaster/companyRegistrationDetails'
                    },
                    {
                        name: 'Compliance Head',
                        routerlink: '/otherMaster/complianceHead'
                    }]
            },
        ];
        this.updateEmpIdSubscription = this.EventEmitterService.setUpdateEmployeeId().subscribe(function (res) {
            _this.employeeMasterId = res;
            _this.checkEmpId();
        });
    };
    LeftmenuComponent.prototype.checkEmpId = function () {
        var empId = localStorage.getItem('employeeMasterId');
        this.employeeMasterId = Number(empId);
        if (this.employeeMasterId) {
            return true;
        }
    };
    LeftmenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var pThis = this;
        setTimeout(function () {
            // debugger
            if (sessionStorage.getItem('Font2') != '' && sessionStorage.getItem('Font2') != null) {
                _this.fontSelect = sessionStorage.getItem('Font2');
            }
            else {
                _this.fontSelect = '';
            }
            if (sessionStorage.getItem('MenuIcon') != '' && sessionStorage.getItem('MenuIcon') != null) {
                _this.menuIconSelect = sessionStorage.getItem('MenuIcon');
                if (_this.menuIconSelect == 'list-a') {
                    _this.onSubMenuIcon(1);
                }
                else if (_this.menuIconSelect == 'list-b') {
                    _this.onSubMenuIcon(2);
                }
                else if (_this.menuIconSelect == 'list-c') {
                    _this.onSubMenuIcon(3);
                }
            }
            else {
                _this.menuIconSelect = '';
            }
            if (sessionStorage.getItem('Toggle') != '' && sessionStorage.getItem('Toggle') != null) {
                _this.toggle1 = true;
            }
            else {
                _this.toggle1 = false;
            }
            if (sessionStorage.getItem('Toggle2') != '' && sessionStorage.getItem('Toggle2') != null) {
                _this.toggle2 = true;
            }
            else {
                _this.toggle2 = false;
            }
            if (sessionStorage.getItem('Toggle3') != '' && sessionStorage.getItem('Toggle3') != null) {
                pThis.toggle3 = true;
            }
            else {
                pThis.toggle3 = false;
            }
            if (sessionStorage.getItem('Toggle4') != '' && sessionStorage.getItem('Toggle4') != null) {
                _this.toggle4 = true;
            }
            else {
                _this.toggle4 = false;
            }
            if (sessionStorage.getItem('Toggle5') != '' && sessionStorage.getItem('Toggle5') != null) {
                _this.toggle5 = true;
            }
            else {
                _this.toggle5 = false;
            }
            if (sessionStorage.getItem('Toggle6') != '' && sessionStorage.getItem('Toggle6') != null) {
                _this.toggle6 = true;
            }
            else {
                _this.toggle6 = false;
            }
            if (sessionStorage.getItem('Toggle7') != '' && sessionStorage.getItem('Toggle7') != null) {
                _this.toggle7 = true;
            }
            else {
                _this.toggle7 = false;
            }
            if (sessionStorage.getItem('Toggle8') != '' && sessionStorage.getItem('Toggle8') != null) {
                _this.toggle8 = true;
            }
            else {
                _this.toggle8 = false;
            }
            if (sessionStorage.getItem('Toggle9') != '' && sessionStorage.getItem('Toggle9') != null) {
                _this.toggle9 = true;
            }
            else {
                _this.toggle9 = false;
            }
            if (sessionStorage.getItem('Toggle10') != '' && sessionStorage.getItem('Toggle10') != null) {
                _this.toggle10 = true;
            }
            else {
                _this.toggle10 = false;
            }
            var haderClassName = document.getElementById('page_top');
            if (sessionStorage.getItem('HeaderClass') != '' && sessionStorage.getItem('HeaderClass') != null) {
                haderClassName.classList.add(sessionStorage.getItem('HeaderClass'));
            }
            else {
                haderClassName.classList.remove('top_dark');
            }
            var minSideClassName = document.getElementById('header_top');
            if (sessionStorage.getItem('MinSideClass') != '' && sessionStorage.getItem('MinSideClass') != null) {
                minSideClassName.classList.add(sessionStorage.getItem('MinSideClass'));
            }
            else {
                minSideClassName.classList.remove('dark');
            }
            var className = document.getElementsByClassName('card');
            var className1 = document.getElementsByClassName('btn');
            var className2 = document.getElementsByClassName('progress');
            var classArray = [className, className1, className2];
            for (var index = 0; index < classArray.length; index++) {
                var classIndex = classArray[index];
                for (var index_1 = 0; index_1 < classIndex.length; index_1++) {
                    var element = classIndex[index_1];
                    if (sessionStorage.getItem('BoxShadow') != '' && sessionStorage.getItem('BoxShadow') != null) {
                        element.classList.add('box_shadow');
                    }
                    else {
                        element.classList.remove('box_shadow');
                    }
                }
            }
            console.log(_this.toggle3);
        });
    };
    LeftmenuComponent.prototype.onTab = function (number) {
        this.chatTab = false;
        this.contactTab = false;
        if (number == '1') {
            this.chatTab = true;
        }
        else if (number == '2') {
            this.contactTab = true;
        }
    };
    LeftmenuComponent.prototype.onFontStyle = function (type) {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('font-opensans');
        body.classList.remove('font-montserrat');
        body.classList.remove('font-roboto');
        if (type == 1) {
            body.classList.add('font-opensans');
            sessionStorage.setItem('Font1', 'font-opensans');
        }
        else if (type == 2) {
            body.classList.add('font-montserrat');
            sessionStorage.setItem('Font1', 'font-montserrat');
        }
        else if (type == 3) {
            body.classList.add('font-roboto');
            sessionStorage.setItem('Font1', 'font-roboto');
        }
    };
    LeftmenuComponent.prototype.onSubMenuIcon = function (type) {
        // debugger
        var submenuIconclass = document.getElementsByClassName('submenu');
        for (var index = 0; index < submenuIconclass.length; index++) {
            var element = submenuIconclass[index];
            element.classList.remove('list-a');
            element.classList.remove('list-b');
            element.classList.remove('list-c');
            sessionStorage.setItem('MenuIcon', '');
            if (type == 1) {
                element.classList.add('list-a');
                sessionStorage.setItem('MenuIcon', 'list-a');
            }
            else if (type == 2) {
                element.classList.add('list-b');
                sessionStorage.setItem('MenuIcon', 'list-b');
            }
            else if (type == 3) {
                element.classList.add('list-c');
                sessionStorage.setItem('MenuIcon', 'list-c');
            }
        }
    };
    LeftmenuComponent.prototype.toggleUserMenu = function () {
        var body = document.getElementsByClassName('user_div')[0];
        if (body.classList.contains('open')) {
            body.classList.remove('open');
        }
        else {
            body.classList.add('open');
        }
        document.getElementsByClassName('overlay')[0].classList.toggle('open');
    };
    LeftmenuComponent.prototype.toggleSettingMenu = function () {
        var body = document.getElementsByClassName('right_sidebar')[0];
        if (body.classList.contains('open')) {
            body.classList.remove('open');
        }
        else {
            body.classList.add('open');
        }
        document.getElementsByClassName('overlay')[0].classList.toggle('open');
    };
    LeftmenuComponent.prototype.onGeneralSetting = function (type, e) {
        var body = document.getElementsByTagName('body')[0];
        if (type == 1) {
            body.classList.toggle('dark-mode');
            if (e.target.checked) {
                this.toggle1 = true;
                sessionStorage.setItem('Toggle', 'true');
            }
            else {
                this.toggle1 = false;
                sessionStorage.setItem('Toggle', '');
            }
        }
        else if (type == 2) {
            if (e.target.checked) {
                this.toggle2 = true;
                sessionStorage.setItem('Toggle2', 'true');
            }
            else {
                this.toggle2 = false;
                sessionStorage.setItem('Toggle2', '');
            }
        }
        else if (type == 3) {
            if (e.target.checked) {
                this.toggle3 = true;
                sessionStorage.setItem('Toggle3', 'true');
            }
            else {
                this.toggle3 = false;
                sessionStorage.setItem('Toggle3', '');
            }
            document.getElementById('page_top').classList.toggle('top_dark');
            if (e.target.checked) {
                sessionStorage.setItem('HeaderClass', 'top_dark');
            }
            else {
                sessionStorage.setItem('HeaderClass', '');
            }
        }
        else if (type == 4) {
            if (e.target.checked) {
                this.toggle4 = true;
                sessionStorage.setItem('Toggle4', 'true');
            }
            else {
                this.toggle4 = false;
                sessionStorage.setItem('Toggle4', '');
            }
            document.getElementById('header_top').classList.toggle('dark');
            if (e.target.checked) {
                sessionStorage.setItem('MinSideClass', 'dark');
            }
            else {
                sessionStorage.setItem('MinSideClass', '');
            }
        }
        else if (type == 5) {
            if (e.target.checked) {
                this.toggle5 = true;
                sessionStorage.setItem('Toggle5', 'true');
            }
            else {
                this.toggle5 = false;
                sessionStorage.setItem('Toggle5', '');
            }
            body.classList.toggle('sidebar_dark');
        }
        else if (type == 6) {
            if (e.target.checked) {
                this.toggle6 = true;
                sessionStorage.setItem('Toggle6', 'true');
            }
            else {
                this.toggle6 = false;
                sessionStorage.setItem('Toggle6', '');
            }
            body.classList.toggle('iconcolor');
        }
        else if (type == 7) {
            if (e.target.checked) {
                this.toggle7 = true;
                sessionStorage.setItem('Toggle7', 'true');
            }
            else {
                this.toggle7 = false;
                sessionStorage.setItem('Toggle7', '');
            }
            body.classList.toggle('gradient');
        }
        else if (type == 8) {
            if (e.target.checked) {
                this.toggle8 = true;
                sessionStorage.setItem('Toggle8', 'true');
            }
            else {
                this.toggle8 = false;
                sessionStorage.setItem('Toggle8', '');
            }
            var className = document.getElementsByClassName('card');
            var className1 = document.getElementsByClassName('btn');
            var className2 = document.getElementsByClassName('progress');
            var classArray = [className, className1, className2];
            for (var index = 0; index < classArray.length; index++) {
                var classIndex = classArray[index];
                for (var index_2 = 0; index_2 < classIndex.length; index_2++) {
                    var element = classIndex[index_2];
                    if (e.target.checked) {
                        element.classList.add('box_shadow');
                        sessionStorage.setItem('BoxShadow', 'box_shadow');
                    }
                    else {
                        element.classList.remove('box_shadow');
                        sessionStorage.setItem('BoxShadow', '');
                    }
                }
            }
        }
        else if (type == 9) {
            if (e.target.checked) {
                this.toggle9 = true;
                sessionStorage.setItem('Toggle9', 'true');
            }
            else {
                this.toggle9 = false;
                sessionStorage.setItem('Toggle9', '');
            }
            body.classList.toggle('rtl');
        }
        else if (type == 10) {
            if (e.target.checked) {
                this.toggle10 = true;
                sessionStorage.setItem('Toggle10', 'true');
            }
            else {
                this.toggle10 = false;
                sessionStorage.setItem('Toggle10', '');
            }
            body.classList.toggle('boxlayout');
        }
    };
    LeftmenuComponent.prototype.toggleMenu = function () {
        var body = document.getElementsByTagName('body')[0];
        if (body.classList.contains('offcanvas-active')) {
            body.classList.remove('offcanvas-active');
        }
        else {
            body.classList.add('offcanvas-active');
        }
    };
    LeftmenuComponent.prototype.cToggoleMenu = function () {
        var body = document.getElementsByTagName('body')[0].classList.remove('offcanvas-active');
        document.getElementsByClassName('overlay')[0].classList.toggle('open');
    };
    LeftmenuComponent.prototype.CardRemoveStatics = function () {
        this.staticscard = false;
    };
    LeftmenuComponent.prototype.CardRemoveFriends = function () {
        this.friendscard = false;
    };
    LeftmenuComponent = __decorate([
        core_1.Component({
            selector: 'app-leftmenu',
            templateUrl: './leftmenu.component.html',
            styleUrls: ['./leftmenu.component.scss']
        }),
        __param(1, core_1.Inject(app_component_1.AppComponent))
    ], LeftmenuComponent);
    return LeftmenuComponent;
}());
exports.LeftmenuComponent = LeftmenuComponent;
