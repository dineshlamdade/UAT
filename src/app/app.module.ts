import { DragDropModule } from '@angular/cdk/drag-drop';
// transloco
// import your locales
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { translocoLoader } from './core/strategies/transloco.loader';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileModule } from './modules/profile/profile.module';
import { SettingsComponent } from './modules/settings/settings.component';
import { SettingsModule } from './modules/settings/settings.module';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');

import { DemoMaterialModule } from './app.material.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MyInvestmentsModule } from './modules/my-Investments/my-Investments.module';
import { PayrollModule } from './modules/payroll/payroll.module';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SettingsComponent,


  ],
  imports: [
    BrowserModule,
    AuthModule,
    ProfileModule ,
    SettingsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatSliderModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CountToModule,
    ToastrModule.forRoot({
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FullCalendarModule,
    CKEditorModule,
    BrowserAnimationsModule,
    TranslocoModule,
    DemoMaterialModule,
    AppRoutingModule,
    DashboardModule,
    MyInvestmentsModule,
    PayrollModule
  ],
  providers: [BsDatepickerModule,
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
    } ],

    bootstrap: [AppComponent]
})
export class AppModule { }
