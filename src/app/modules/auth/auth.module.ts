import { CommonModule } from '@angular/common';
// import your locales
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DemoMaterialModule } from './../../app.material.module';
// transloco
import { translocoLoader } from './../../core/strategies/transloco.loader';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorPage2Component } from './error-page2/error-page2.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptorService } from './token-interceptor/token-interceptor.service';
import { PsadminComponentSelectionComponent } from './psadmin-component-selection/psadmin-component-selection.component';
import { GroupOrCompanySelectionComponent } from './group-or-company-selection/group-or-company-selection.component';
import { GlobalModuleListComponent } from './global-module-list/global-module-list.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SharedModule } from 'primeng/api';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule.forRoot(),
    DemoMaterialModule,
    TranslocoModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    SharedlayoutModule,
  ],
  declarations: [AuthRoutingModule.components, LoginComponent, ForgotPasswordComponent, RegisterComponent, ErrorPageComponent, ErrorPage2Component, PsadminComponentSelectionComponent, GroupOrCompanySelectionComponent, GlobalModuleListComponent, ChangepasswordComponent],
  providers: [ translocoLoader,
    AuthService,
    {
    provide: TRANSLOCO_CONFIG,
    useValue: {
      availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }],
      listenToLangChange: true,
      reRenderOnLangChange: true,
      defaultLang: 'en',
      fallbackLang: 'fr',

      prodMode: false,
    } as TranslocoConfig,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
],
})
export class AuthModule { }
