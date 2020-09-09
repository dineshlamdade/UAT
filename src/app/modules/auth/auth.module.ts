import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorPage2Component } from './error-page2/error-page2.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DemoMaterialModule } from './../../app.material.module';
// transloco
import { translocoLoader } from './../../core/strategies/transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
// import your locales
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule.forRoot(),
    DemoMaterialModule,
    TranslocoModule
  ],
  declarations: [AuthRoutingModule.components, LoginComponent, ForgotPasswordComponent, RegisterComponent, ErrorPageComponent, ErrorPage2Component],
  providers: [ translocoLoader, {
    provide: TRANSLOCO_CONFIG,
    useValue: {
      availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }],
      listenToLangChange: true,
      reRenderOnLangChange: true,
      defaultLang: 'en',
      fallbackLang: 'fr',

      prodMode: false
    } as TranslocoConfig
  },]
})
export class AuthModule { }