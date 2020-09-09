import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderComponent } from './modules/header/header.component';
import { LeftmenuComponent } from './modules/leftmenu/leftmenu.component';
import { PayrollComponent } from './modules/payroll/payroll.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { InvestmentComponent } from './modules/investment/investment.component';

// transloco
import { translocoLoader } from './core/strategies/transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
// import your locales
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');

import { DemoMaterialModule } from './app.material.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LeftmenuComponent,
    PayrollComponent,
    ProfileComponent,
    SettingsComponent,
    InvestmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    TranslocoModule,
    DemoMaterialModule
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
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
