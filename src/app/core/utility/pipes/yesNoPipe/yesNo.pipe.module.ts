import { NgModule } from '@angular/core';
import { YesNoPipe } from './yesNo.pipe';

@NgModule({
    declarations: [YesNoPipe],
    exports: [
        YesNoPipe
      ]
  
  })
  export class yesNoPipeModule { }