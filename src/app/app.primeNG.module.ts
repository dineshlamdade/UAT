import {NgModule} from '@angular/core';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';




@NgModule({
  exports: [
    AutoCompleteModule,
    DropdownModule
  ]
})
export class PrimeNGModule {}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */