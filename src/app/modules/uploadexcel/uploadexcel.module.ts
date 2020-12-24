import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadexcelComponent } from './uploadexcel.component';
import { UploadexcelRoutingModule } from './uploadexcel-routing.module';
 import { UploadexcelhomeComponent } from './uploadexcelhome/uploadexcelhome.component';
 import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
 import {PanelMenuModule} from 'primeng/panelmenu';
 import {ScrollPanelModule} from 'primeng/scrollpanel';
 import { TooltipModule } from 'ngx-bootstrap/tooltip';
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [UploadexcelComponent,
    UploadexcelhomeComponent
  ],
  imports: [
    CommonModule,
    UploadexcelRoutingModule,
    SharedlayoutModule,
    PanelMenuModule,
    ScrollPanelModule,
    TooltipModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class UploadexcelModule { }