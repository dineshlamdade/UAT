"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrimeNGModule = void 0;
var core_1 = require("@angular/core");
var autocomplete_1 = require("primeng/autocomplete");
var dropdown_1 = require("primeng/dropdown");
var table_1 = require("primeng/table");
var PrimeNGModule = /** @class */ (function () {
    function PrimeNGModule() {
    }
    PrimeNGModule = __decorate([
        core_1.NgModule({
            exports: [
                autocomplete_1.AutoCompleteModule,
                dropdown_1.DropdownModule,
                table_1.TableModule,
            ]
        })
    ], PrimeNGModule);
    return PrimeNGModule;
}());
exports.PrimeNGModule = PrimeNGModule;
/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
