"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenInterceptorService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TokenInterceptorService = /** @class */ (function () {
    function TokenInterceptorService(authService, alertService, router) {
        this.authService = authService;
        this.alertService = alertService;
        this.router = router;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    }
    TokenInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }
        return next.handle(request).pipe(operators_1.catchError(function (error) {
            var type = error.status;
            console.log(error.status);
            switch (type) {
                case 401: {
                    _this.authService.logout();
                    _this.alertService.sweetalertError('Session Has Expired !!');
                    break;
                }
                //    case  0 : {
                //     console.log(type)
                //     this.authService.logout();
                //     this.alertService.alert( 'Session Has Expired !!', 'warning', 'login');
                //     break;
                //  }
                case 404: {
                    _this.alertService.sweetalertError('Data not found !!');
                    break;
                }
                case 500: {
                    _this.alertService.sweetalertError('Failed To load Resource,  Please Try Again !!');
                    break;
                }
                default: {
                    console.log('default error');
                    _this.alertService.sweetalertError('Something Went Wrong,  Please Try Again !!');
                    break;
                }
            }
            console.log('my error status', error.status);
            // if ( error.status === 401) {
            //   this.authService.logout();
            //   this.alertService.alert( 'Session Has Expired !!', 'warning', 'login');
            //   return throwError(error);
            //   // return this.handle401Error(request, next);
            // } else if (error.status === 0 ) {
            //     this.alertService.alert('Session Has Expired !!' , 'warning', 'home');
            //     this.authService.logout();
            //   return throwError(error);
            // } else if (error.status === 404) {
            //   this.alertService.alert('Data not found !!', 'warning', 'home');
            //   return throwError(error);
            // } else if (error.status === 500) {
            //   this.alertService.alert('Failed To load Resource,  Please Try Again !!', 'warning', 'home');
            //   return throwError(error);
            // } else {
            //   this.authService.logout();
            //   this.alertService.alert('Session Has Expired !!', 'warning', 'login');
            //   return throwError(error);
            // }
            return rxjs_1.throwError(error);
        }));
    };
    TokenInterceptorService.prototype.addToken = function (request, token) {
        return request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    };
    TokenInterceptorService.prototype.handle401Error = function (request, next) {
        var _this = this;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(operators_1.switchMap(function (token) {
                _this.isRefreshing = false;
                _this.refreshTokenSubject.next(token.jwt);
                return next.handle(_this.addToken(request, token.jwt));
            }));
        }
        else {
            return this.refreshTokenSubject.pipe(operators_1.filter(function (token) { return token != null; }), operators_1.take(1), operators_1.switchMap(function (jwt) {
                return next.handle(_this.addToken(request, jwt));
            }));
        }
    };
    TokenInterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenInterceptorService);
    return TokenInterceptorService;
}());
exports.TokenInterceptorService = TokenInterceptorService;
//   constructor( private injector: Injector) { }
//   intercept(req, next) {
//     const authService = this.injector.get(AuthService);
//     const tokenizedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${authService.getToken()}`,
//       },
//     });
//     return next.handle(tokenizedReq);
//   }
// }
