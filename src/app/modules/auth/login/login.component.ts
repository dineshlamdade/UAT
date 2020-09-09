import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {
  locales = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    // { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇫🇷 Français', value: 'fr' }
  ];
  selectedLanguage: any;
  locale = this.locales[0].value;



  constructor(private translocoService: TranslocoService) {

    // this.detectedLocale = this.getUsersLocale('en-US');
    this.selectedLanguage = localStorage.getItem("selectedLanguage");
    // generate a regex from the locales we support
    const supportedRegex = new RegExp('^' + this.locales.map(l => l.value.substring(0, 2)).join('|^'));
    // check if the user's preferred language is supported and if so, use it.
    if (this.selectedLanguage) {
      // check if the user's preferred language is supported and if so, use it.
      if (this.selectedLanguage.match(supportedRegex)) {
        this.updateLocale(this.selectedLanguage);
      }
    }
  }

  ngOnInit(): void {

  }

  // change locale/language at runtime
  updateLocale(locale) {
    localStorage.setItem("selectedLanguage", locale);

    if (this.locales.some(l => l.value === locale)) {
      this.locale = locale;
    }
    const lang = locale.substring(0, 2);
    this.translocoService.setActiveLang(lang);
  }


}
