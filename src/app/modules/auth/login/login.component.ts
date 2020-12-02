import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import jwt_decode from 'jwt-decode';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { decode } from 'punycode';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { AuthService } from './../auth.service';
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
  timeLeft: number = 1000;
  minLeft: number;
  secLeft: number;
  interval;
  public locales = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    // { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇫🇷 Français', value: 'fr' },
  ];
  public selectedLanguage: any;
  public locale = this.locales[0].value;
  public otpDiv: boolean;
  public otp: number;

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
this.otpDiv = false;
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
      this.otpDiv = true;
      console.log(this.otpDiv);
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
          this.minLeft = Math.floor(this.timeLeft / 100);
          this.secLeft = (this.timeLeft % 100);
        }
        // else {
        //   this.timeLeft = 1000;
        // }
      }, 1000);
       
        // this.alertService.sweetalertError('Something went wrong. Please try again.');
    },
    (err) => {
      console.log(err.error);
      if ( err instanceof HttpErrorResponse) {
        if ( err.error.status.code === '401') {
          this.alertService.sweetalertError(
            'Invalid username or password',
          );
        }
      }
    },
    );

  }

  submitOTP() {
    const data = {
      emailId: this.email,
      otp: this.otp,
    };
    console.log(data);
    this.service.postOTP(data)
    .subscribe((res) => {
      console.log(res);
      // localStorage.setItem('token', res.data.results[0].token);
      console.log(res.data.results[0].token);
      console.log(this.service.getJwtToken());
      const decoded = jwt_decode(res.data.results[0].token);
      console.log(decoded);
      this.router.navigate(['dashboard']);
      this.alertService.sweetalertMasterSuccess('Login successfull','');
      // this.alertService.sweetalertError('Something went wrong. Please try again.');
    },
    (err) => {
            console.log(err.error);
            if ( err instanceof HttpErrorResponse) {
              if ( err.error.status.code === '400') {
                this.alertService.sweetalertError(
                  'Invalid correct OTP,' + err.error.status.message,
                );
              }
            }
    });

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
