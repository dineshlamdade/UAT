import { HttpClient, HttpHeaders} from '@angular/common/http';
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
public apiUrl = environment.baseUrl;
public token:any = 'eyJhbGciOiJSUzI1NiJ9.eyJwcml2aWxlZ2VzIjpbeyJYLVRlbmFudElkIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlHcm91cE1hc3RlcklkIjoxLCJjb21wYW55TmFtZSI6IldoaXRlSGVkZ2UiLCJnbG9iYWxDb21wYW55TWFzdGVySWQiOjEsImFwcGxpY2F0aW9uUm9sZUlkIjoyLCJ1c2VyTmFtZSI6IlJhZ2h1SyIsImVtcGxveWVlTWFzdGVySWQiOjJ9LHsiWC1UZW5hbnRJZCI6IlBheXNxdWFyZURlZmF1bHQiLCJjb21wYW55R3JvdXBNYXN0ZXJJZCI6MSwiY29tcGFueU5hbWUiOiJUQVRBIE1PVE9SUyIsImdsb2JhbENvbXBhbnlNYXN0ZXJJZCI6MywiYXBwbGljYXRpb25Sb2xlSWQiOjMsInVzZXJOYW1lIjoiUmFnaHVLIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MH1dLCJzdWIiOiIyIiwiaXNzIjoiaHR0cDovL3BheXNxdWFyZS5jb20iLCJleHAiOjE2MDkzMzAzNDMsImlhdCI6MTYwOTMyOTc0MywianRpIjoiNjRiOTk5MjEtNTk4Mi00N2JkLWE4MzctODBkMTMzODkxMjU4In0.mLfM1fLqpCGto2NTrVZMKRBkE0-qiT4VpJHAUuZF9HhZHVTeEwlP9OsdRwbSKzzUZO6nW-I6p4T0q6vbut0Sh5uf6zh_WKOpotx6Czc7ULjuJACkipxGBBl-s6tTeQi4-VrXz6Xcdea67ACDbEPidG7u7tlFdncKMq6Z_wKOs72WR_vugXGHl8_RzRfWsDJp0uX6lQNwzWvX_MJxiFHd3cqryeaF55MfYkWluyPyPk_5xXUmoTWAbAsQ1yaLHUG_8Xy17ktBHObFu94DxDOTDMumjwdiQF6lKagPeuItydja7JBENW5A1Ca0ZNs1CPvD9MOnToqDSuAChSvWZq60PQ';
public decodedToken: any;
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
      this.token = res.data.results[0].token;
      return res;
    }));
  }

  getApplicationRoleID(data) {
    const headers = new HttpHeaders()
    .set('X-Authorization', this.token);
    console.log(data, headers)
    return this.http.get(this.apiUrl + 'applicationRolePrivilegesMatrix/'+ data, { 'headers': headers })
    .pipe(map((res: any) => {
      this.doLoginUser(this.token);
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
