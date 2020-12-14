import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { translocoLoader } from './../../core/strategies/transloco.loader';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedlayoutModule,
    DashboardRoutingModule,
    TranslocoModule
  ],
  providers:[
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
      }
    ],
})
export class DashboardModule { }
