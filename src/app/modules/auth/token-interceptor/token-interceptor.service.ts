import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { AuthService } from './../auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService,
              private alertService: AlertServiceService,
              private router: Router ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError((error) => {
      const type = error.status;
      console.log(error.status);
      switch (type) {
        case  401 : {
          this.authService.logout();
          this.alertService.sweetalertError( 'Session Has Expired !!');
          break;
         }

      //    case  0 : {
      //     console.log(type)
      //     this.authService.logout();
      //     this.alertService.alert( 'Session Has Expired !!', 'warning', 'login');
      //     break;
      //  }
      case  401 : {
        this.alertService.sweetalertError('Invalid Token Please, Please Try Again !!!!', );
        break;
     }
       case  404 : {
        this.alertService.sweetalertError('Data not found !!', );
        break;
     }
     case  500 : {
      this.alertService.sweetalertError('Failed To load Resource,  Please Try Again !!', );
      break;
   }
//      default : {
//       console.log('default error');
//       this.alertService.sweetalertError('Something Went Wrong,  Please Try Again !!', );
//       break;
//  }

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

      return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}

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
