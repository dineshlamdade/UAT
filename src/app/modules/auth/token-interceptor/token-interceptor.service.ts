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
    private router: Router) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(catchError((error) => {
      const type = error.status;
      const message = error.message
      console.log(error.message + " error")
      switch (type) {
        case 401: {
          this.authService.logout();
          this.alertService.sweetalertError('Your session is expired please login again !!');
          //this.router.navigate(['/login']);
          break;
        }
        case 400: {
          // if(message == 'Invalid Token String'){
          //   this.alertService.sweetalertError('Invalid Token String');
          //   // this.authService.logout();
          //   // this.router.navigate(['/login']);
          // }else if(message == 'Your session is expired please login again'){
          //   this.alertService.sweetalertError('Your session is expired please login again');
          //   // this.authService.logout();
          //   // this.router.navigate(['/login']);
          // }
          break;
        }
        case 401: {
          this.alertService.sweetalertError('Invalid Token Please, Please Try Again !!!!',);
          //this.router.navigate(['/login']);
          break;
        }
        case 404: {
          this.alertService.sweetalertError('Data not found !!',);
          break;
        }
        case 500: {
          this.alertService.sweetalertError('Failed To load Resource,  Please Try Again !!',);
          break;
        }
      }
      return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    //console.log('My token ',token);
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'X-Authorization': token,
        'Access-Control-Max-Age': '600',
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