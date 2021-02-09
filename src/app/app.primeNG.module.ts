import {NgModule} from '@angular/core';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';





@NgModule({
  exports: [
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule
  
  ]
})
export class PrimeNGModule {}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
