"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlertServiceService = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AlertServiceService = /** @class */ (function () {
    function AlertServiceService(router) {
        this.router = router;
    }
    AlertServiceService.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    AlertServiceService.prototype.sweetalertWarning = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#e68a00',
            icon: 'warning',
            timer: 15000,
            timerProgressBar: true
        });
    };
    AlertServiceService.prototype.sweetalertInfo = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'info',
            timer: 5000,
            timerProgressBar: true
        });
    };
    AlertServiceService.prototype.sweetalertMasterSuccess = function (message, text) {
        sweetalert2_1["default"].fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'success',
            timer: 5000,
            timerProgressBar: true
        });
    };
    AlertServiceService.prototype.sweetalertError = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
    };
    // lert( title: string, type: any, redirectPath: string) {
    //   Swal.fire({
    //     title: title,
    //         buttonsStyling: true,
    //        confirmButtonClass: 'btn btn-info',
    //        customClass: 'animated tada',
    //        type: type,
    //   }).then((result) => {
    //     if (result.value) {
    //        this.router.navigate(['/' + redirectPath + '']);
    //     }
    //   });
    // }
    // alertReload( title: string, type: any) {
    //   swal({
    //     title: title,
    //         buttonsStyling: true,
    //        confirmButtonClass: 'btn btn-info',
    //        customClass: 'animated tada',
    //        type: type,
    //   }).then((result) => {
    //     if (result.value) {
    //       window.location.reload();
    //     }
    //   });
    // }
    //   showNotification(msg: number, name: string) {
    //     const message = ['Welcome to Delezia HR' + ' <br> <b>' + name + '</b> ', '' + ' <b>' + name + '</b> '];
    //      $.notify({
    //          icon: 'notifications',
    //          message: message[msg],
    //      }, {
    //          type: 'primary',
    //          timer: 4000,
    //          placement: {
    //              from: 'top',
    //              align: 'right'
    //          },
    //          template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
    //            // tslint:disable-next-line:max-line-length
    //            '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
    //            '<i class="material-icons" data-notify="icon">notifications</i> ' +
    //            '<span data-notify="title">{1}</span> ' +
    //            '<span data-notify="message">{2}</span>' +
    //            '<div class="progress" data-notify="progressbar">' +
    //              // tslint:disable-next-line:max-line-length
    //              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    //            '</div>' +
    //            '<a href="{3}" target="{4}" data-notify="url"></a>' +
    //          '</div>'
    //      });
    //    }
    // alert( title: string, type: any, redirectPath: string) {
    //     Swal({
    //       title,
    //           buttonsStyling: true,
    //          confirmButtonClass: 'btn btn-info',
    //          customClass: 'animated tada',
    //          type,
    //     }).then((result) => {
    //       if (result.value) {
    //          this.router.navigate(['/' + redirectPath + '']);
    //       }
    //     });
    //   }
    AlertServiceService.prototype.showNotification = function (msg, name) {
        var message = ['Welcome to EHR India' + ' <br> <b>' + name + '</b> ', '' + ' <b>' + name + '</b> '];
        $.notify({
            icon: 'notifications',
            message: message[msg]
        }, {
            type: 'primary',
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
                // tslint:disable-next-line:max-line-length
                '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                // tslint:disable-next-line:max-line-length
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    };
    AlertServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AlertServiceService);
    return AlertServiceService;
}());
exports.AlertServiceService = AlertServiceService;
