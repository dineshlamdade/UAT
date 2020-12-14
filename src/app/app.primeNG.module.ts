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

