import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { translocoLoader } from './../../core/strategies/transloco.loader';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
registerLocaleData( localeFr, 'fr' );
registerLocaleData( localeGb, 'en-GB' );
import { PrimeNGModule } from './../../app.primeNG.module';
import { LeftadminmenuComponent } from './leftadminmenu/leftadminmenu';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule( {
  declarations: [FooterComponent, HeaderComponent, LeftmenuComponent, LeftadminmenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CollapseModule.forRoot(),
    TranslocoModule,
    AccordionModule,
    PrimeNGModule,
    TooltipModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    LeftmenuComponent,
    LeftadminmenuComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    translocoLoader, {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }],
        listenToLangChange: true,
        reRenderOnLangChange: true,
        defaultLang: 'en',
        fallbackLang: 'fr',

        prodMode: false
      } as TranslocoConfig
    }],
} )
export class SharedlayoutModule { }
