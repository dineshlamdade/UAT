import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Delizia-HR';
  greenClass: any;
  orageClass: boolean;
  blushClass: boolean;
  cyanClass: boolean = true;
  timberClass: boolean;
  blueClass: boolean;
  amethystClass: boolean;
  selectedLanguage: any;
  locales = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    // { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇫🇷 Français', value: 'fr' }
  ];
  locale = this.locales[0].value;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translocoService: TranslocoService) {
      this.selectedLanguage = localStorage.getItem("selectedLanguage");
      // generate a regex from the locales we support
      if(this.selectedLanguage){
        const supportedRegex = new RegExp('^' + this.locales.map(l => l.value.substring(0, 2)).join('|^'));
        // check if the user's preferred language is supported and if so, use it.
        if (this.selectedLanguage.match(supportedRegex)) {
          this.updateLocale(this.selectedLanguage);
        }
      }
     }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add("offcanvas-active");
    body.classList.add('font-montserrat');
    sessionStorage.setItem("MinSideClass", "");
    sessionStorage.setItem("HeaderClass", "top_dark");

    sessionStorage.setItem("MenuIcon", "list-a");
    sessionStorage.setItem("Toggle", "");
    sessionStorage.setItem("Toggle2", "");
    sessionStorage.setItem("Toggle3", "true");
    sessionStorage.setItem("Toggle4", "");
    sessionStorage.setItem("Toggle5", "");
    sessionStorage.setItem("Toggle6", "");
    sessionStorage.setItem("Toggle7", "");
    sessionStorage.setItem("Toggle8", "");
    sessionStorage.setItem("Toggle9", "");
    sessionStorage.setItem("Toggle10", "");

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title)
        })
      });

    setTimeout(() => {

      document.getElementsByClassName('page-loader-wrapper')[0].classList.add("HideDiv");

    }, 1000);
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }
  toggleThemeSetting() {
    const className = document.getElementsByClassName('themesetting')[0];
    className.classList.toggle('open');
  }


  closeMenu() {
    document.getElementsByClassName('right_sidebar')[0].classList.remove("open");
    document.getElementsByClassName('user_div')[0].classList.remove("open");
    document.getElementsByClassName('overlay')[0].classList.remove("open");
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
