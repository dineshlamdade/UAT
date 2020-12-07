import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
// public apiUrl = environment.apiBaseUrl;
public apiUrl = environment.baseUrlUAt;
private readonly JWT_TOKEN = '%qycutr';
    private readonly REFRESH_TOKEN = '';
    public loggedUser: string;
  constructor(private http: HttpClient,
              private router: Router) { }

  postLogin(data) {

    return this.http.post(this.apiUrl + 'users/login', data);
    // .pipe(map((res: any) => {
    //   return res;
    // }));
  }

  postOTP(data) {
    return this.http.post(this.apiUrl + 'otp/validate', data)
    .pipe(map((res: any) => {
      this.doLoginUser(res.data.results[0].token);
      return res;
    }));
  }

  // loggedIn() {
  //   return !!localStorage.getItem('token');
  // }

  // getToken() {
  //   const decoded = localStorage.getItem('token');
  //   // return localStorage.getItem('token');
  //   return decoded;
  // }

  // loggedOut() {
  //   this.router.navigate(['login']);
  //   return localStorage.removeItem('token');
  // }
  public login(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'otp/validate', data)
      .pipe(
        tap((token) => this.doLoginUser(token)),
        map((res: any) => {
          console.log(res);
          return res;
    }),
        // mapTo(true),
        catchError((error) => {
        //  alert(error);
          return of(false);
        }));
  }

  logout() {

    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(this.apiUrl + '/Refresh', {
      refreshToken: this.getRefreshToken(),
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  getprivileges() {
    return jwt_decode(sessionStorage.getItem(this.JWT_TOKEN));
  }

  private doLoginUser(tokens: Tokens) {
   // this.loggedUser = username;
    this.storeTokens(tokens);

  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens) {
    sessionStorage.setItem(this.JWT_TOKEN, tokens);
   // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.clear();
  }
}

export class Tokens {
  public jwt: string;
  public refreshToken: string;
}
