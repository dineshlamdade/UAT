import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { AuthService } from './../auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } },
  ],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public activateDiv: string = "profile";
  public otp: number;
  public roleId: number;
public token:any = 'eyJhbGciOiJSUzI1NiJ9.eyJwcml2aWxlZ2VzIjpbeyJYLVRlbmFudElkIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlHcm91cE1hc3RlcklkIjoxLCJjb21wYW55TmFtZSI6IldoaXRlSGVkZ2UiLCJnbG9iYWxDb21wYW55TWFzdGVySWQiOjEsImFwcGxpY2F0aW9uUm9sZUlkIjoyLCJ1c2VyTmFtZSI6IlJhZ2h1SyIsImVtcGxveWVlTWFzdGVySWQiOjJ9LHsiWC1UZW5hbnRJZCI6IlBheXNxdWFyZURlZmF1bHQiLCJjb21wYW55R3JvdXBNYXN0ZXJJZCI6MSwiY29tcGFueU5hbWUiOiJUQVRBIE1PVE9SUyIsImdsb2JhbENvbXBhbnlNYXN0ZXJJZCI6MywiYXBwbGljYXRpb25Sb2xlSWQiOjMsInVzZXJOYW1lIjoiUmFnaHVLIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MH1dLCJzdWIiOiIyIiwiaXNzIjoiaHR0cDovL3BheXNxdWFyZS5jb20iLCJleHAiOjE2MDkzMzAzNDMsImlhdCI6MTYwOTMyOTc0MywianRpIjoiNjRiOTk5MjEtNTk4Mi00N2JkLWE4MzctODBkMTMzODkxMjU4In0.mLfM1fLqpCGto2NTrVZMKRBkE0-qiT4VpJHAUuZF9HhZHVTeEwlP9OsdRwbSKzzUZO6nW-I6p4T0q6vbut0Sh5uf6zh_WKOpotx6Czc7ULjuJACkipxGBBl-s6tTeQi4-VrXz6Xcdea67ACDbEPidG7u7tlFdncKMq6Z_wKOs72WR_vugXGHl8_RzRfWsDJp0uX6lQNwzWvX_MJxiFHd3cqryeaF55MfYkWluyPyPk_5xXUmoTWAbAsQ1yaLHUG_8Xy17ktBHObFu94DxDOTDMumjwdiQF6lKagPeuItydja7JBENW5A1Ca0ZNs1CPvD9MOnToqDSuAChSvWZq60PQ';

  timeLeft: number = 600;
  minLeft: number = 10;
  secLeft: number = 0;
  interval;
  public companyArray: Array<any> = [];
  public locales = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    // { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇫🇷 Français', value: 'fr' },
  ];
  public selectedLanguage: any;
  public locale = this.locales[0].value;

  constructor(private translocoService: TranslocoService,
              private service: AuthService,
              private router: Router,
              private alertService: AlertServiceService,
    ) {

    // this.detectedLocale = this.getUsersLocale('en-US');
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    // generate a regex from the locales we support
    const supportedRegex = new RegExp('^' + this.locales.map((l) => l.value.substring(0, 2)).join('|^'));
    // check if the user's preferred language is supported and if so, use it.
    if (this.selectedLanguage) {
      // check if the user's preferred language is supported and if so, use it.
      if (this.selectedLanguage.match(supportedRegex)) {
        this.updateLocale(this.selectedLanguage);
      }
    }
  }

  public ngOnInit(): void {
    this.token = jwt_decode(this.token)
      console.log(this.token)
      this.companyArray = this.token.privileges;
  }

  signIn() {

    const data = {
      emailId: this.email,
      password: this.password,
    };
    console.log(data);
    this.service.postLogin(data)
    .subscribe((res) => {
      console.log(res);
      this.activateDiv = "otp";
      this.alertService.sweetalertMasterSuccess(res['status']['message'],'');

      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.minLeft = Math.floor(this.timeLeft / 60);
          this.secLeft = Math.floor(this.timeLeft % 60);
        }
        else {
          // this.timeLeft = 1000;
          //this.otpDiv = false;
          window.location.reload();
        }
      }, 1000);
       
        // this.alertService.sweetalertError('Something went wrong. Please try again.');
    },
    (err) => {
      console.log(err.error);
      if ( err instanceof HttpErrorResponse) {
          this.alertService.sweetalertError(
            err.error.status.message,
          );
      }
    },
    );

  }

  submitOTP() {
    //mobileNumber;
    const data = {
      emailId: this.email,
      otp: this.otp,
    };
    console.log(data);
    this.service.postOTP(data)
    .subscribe((res) => {
      console.log(res);
      this.activateDiv = "profile"
      // localStorage.setItem('token', res.data.results[0].token);
      console.log(res.data.results[0].token);
      this.token = jwt_decode(res.data.results[0].token)
      console.log(this.token)
      this.companyArray = this.token.privileges;
      
      this.alertService.sweetalertMasterSuccess('Login successfull','');
      // this.alertService.sweetalertError('Something went wrong. Please try again.');
    },
    (err) => {
            console.log(err.error);
            if ( err instanceof HttpErrorResponse) {
              if ( err.error.status.code === '400') {
                this.alertService.sweetalertError(
                   err.error.status.message,
                );
              }
            }
    });

  }

  submitProfileID(){
console.log(this.roleId)
this.service.getApplicationRoleID(this.roleId).subscribe((res)=>{
  console.log(res)
//this.router.navigate(['dashboard']);
},
(err) => {
        console.log(err.error);
        if ( err instanceof HttpErrorResponse) {
          if ( err.error.status.code === '400') {
            this.alertService.sweetalertError(
               err.error.status.message,
            );
          }
        }
});
  }

  resendOTP() {
    this.timeLeft = 600;
    const data = {
      emailId: this.email,
      password: this.password,
    };
    this.service.postLogin(data)
    .subscribe((res) => {
      console.log(res);
    }
    );
  }

  // change locale/language at runtime
  updateLocale(locale) {
    localStorage.setItem('selectedLanguage', locale);

    if (this.locales.some((l) => l.value === locale)) {
      this.locale = locale;
    }
    const lang = locale.substring(0, 2);
    this.translocoService.setActiveLang(lang);
  }

}
