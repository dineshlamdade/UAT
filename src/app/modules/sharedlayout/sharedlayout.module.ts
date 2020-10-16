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

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');


@NgModule({
  declarations: [FooterComponent, HeaderComponent, LeftmenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CollapseModule.forRoot(),
    TranslocoModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    LeftmenuComponent,
    HeaderComponent,
    FooterComponent,
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
      }],
})
export class SharedlayoutModule { }
