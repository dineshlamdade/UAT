
import { investmentChapterVIAModule } from './modules/my-Investments/VI-A/chapterVIA.module';
import { workflowModule } from './modules/workflow/workflow.module';
import { OtherMasterModule } from './modules/other-master/other-master.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';

// import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { translocoLoader } from './core/strategies/transloco.loader';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileModule } from './modules/profile/profile.module';
import { QueryModule } from './modules/query/query.module';
import { LoanModule } from './modules/loan/loan.module';
import { SettingsComponent } from './modules/settings/settings.component';
import { SettingsModule } from './modules/settings/settings.module';
import { BnNgIdleService } from 'bn-ng-idle';

registerLocaleData( localeFr, 'fr' );
registerLocaleData( localeGb, 'en-GB' );

import { DemoMaterialModule } from './app.material.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { TokenInterceptorService } from './modules/auth/token-interceptor/token-interceptor.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EmployeeMasterModule } from './modules/employee-master/employee-master.module';
//accordion and accordion tab
//accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { LMSModule } from './modules/lms/lms.module';
import { EightyCModule } from './modules/my-Investments/80C/eighty-c.module';
import { MyInvestmentsModule } from './modules/my-Investments/my-Investments.module';
//import { investmentOthersModule } from './modules/my-Investments/others/others.module';
import { PayrollModule } from './modules/companysetting/payroll/payroll.module';
import { AdminApprovalModule } from './modules/admin-approval/admin-approval.module';
import { UploadexcelModule } from './modules/uploadexcel/uploadexcel.module';
import { EmployeemasterlistpageModule } from './modules/employeemasterlistpage/employeemasterlistpage.module';
import { PayrollInputsModule } from './modules/payroll-inputs/payroll-inputs.module';
import { ShortenStringPipe } from './core/utility/pipes/shorten-string.pipe';
import { CompanySettingModule } from './modules/companysetting/companysetting.module';
import { LockModule } from './modules/lock/lock.module';





/* import {SignaturePadModule} from 'angular2-signaturepad'; */

/* import { SignaturePadModule } from './modules/@ng-plus/signature-pad'; */
/* import { } from '@ng-plus/signature-pad' */



////////////////////////////////////


import { PrimeNGModule } from './app.primeNG.module';
import { AccordionModule } from 'primeng/accordion';
import { EmailSmsModule } from './modules/email-sms/email-sms.module';
import { LoanMasterModule } from './modules/loan-master/loan-master.module';
import { from } from 'rxjs';
import { SignaturePadModule } from 'angular2-signaturepad';
import { InvestmentApprovalModule } from './modules/investment-approval/investment-approval.module';
import { ApprovedInvestmentModule } from './modules/approved-investment/approved-investment.module';





@NgModule( {
  declarations: [
    AppComponent,
    ProfileComponent,
    ShortenStringPipe,
    SettingsComponent,
    
  ],

  exports: [],
  imports: [
    BrowserModule,
    AuthModule,
    PrimeNGModule,
    AccordionModule,
    DashboardModule,
    PayrollModule,
    QueryModule,
    LoanModule,
    CompanySettingModule,
    MyInvestmentsModule,
    InvestmentApprovalModule,
    PayrollInputsModule,
    /////////////////
    //  payrollModule,
    LockModule,
    ////////////////////////////////
    MyInvestmentsModule,
    investmentChapterVIAModule,
    EightyCModule,
    ProfileModule,
    SettingsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatSliderModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CountToModule,
    ToastrModule.forRoot( {
    } ),
    CalendarModule.forRoot( {
      provide: DateAdapter,
      useFactory: adapterFactory,
    } ),
    CKEditorModule,
    BrowserAnimationsModule,
    TranslocoModule,
    DemoMaterialModule,
    AppRoutingModule,
    DashboardModule,
    MyInvestmentsModule,

    EmployeeMasterModule,
    PrimeNGModule,
    AccordionModule,
    OtherMasterModule,
    AdminApprovalModule,
    AdminApprovalModule,
    UploadexcelModule,
    EmployeemasterlistpageModule,
    EmailSmsModule,
    LoanMasterModule,
    SignaturePadModule,
    InvestmentApprovalModule,
    ApprovedInvestmentModule

  ],

  providers: [BsDatepickerModule,
    BnNgIdleService,
    AuthGuard,
    translocoLoader, {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }, { id: 'hi', label: 'Hindi' }],
        listenToLangChange: true,
        reRenderOnLangChange: true,
        defaultLang: 'en',
        fallbackLang: 'fr',

        prodMode: false,
      } as TranslocoConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    ShortenStringPipe,
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],


  bootstrap: [AppComponent]
} )
export class AppModule { }
