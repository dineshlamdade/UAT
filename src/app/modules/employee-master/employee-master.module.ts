import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatPipe } from '../../core/utility/pipes/NumberFormatPipe';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';

import { MatSliderModule } from '@angular/material/slider';
import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { translocoLoader } from './../../core/strategies/transloco.loader';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ConfirmationModalComponent } from './shared modals/confirmation-modal/confirmation-modal.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { IdentityInformationComponent } from './identity-information/identity-information.component';
import { DemoMaterialModule } from './../../app.material.module';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');


@NgModule({
    declarations: [
        PersonalInformationComponent,
        ConfirmationModalComponent,
        ContactInformationComponent,
        IdentityInformationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSliderModule,
        TooltipModule.forRoot(),
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
        SharedlayoutModule,
        EmployeeMasterRoutingModule,
        TranslocoModule,
        DemoMaterialModule
    ],

    providers: [DatePipe, NumberFormatPipe,
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
    entryComponents: [ConfirmationModalComponent],

})
export class EmployeeMasterModule { }
