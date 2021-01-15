import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { AdminApprovalRoutingModule } from './admin-approval-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
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

import { MatSliderModule } from '@angular/material/slider';
import { ApprovalsComponent } from './approvals/approvals.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {PickListModule} from 'primeng/picklist';


@NgModule({
  declarations: [AdminDashboardComponent, ApprovalsComponent],
  imports: [
    CommonModule,

    SharedlayoutModule,
    CommonModule,
    ReactiveFormsModule,
    PickListModule,
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
    NgMultiSelectDropDownModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    SharedlayoutModule,
    AdminApprovalRoutingModule,



  ]
})
export class AdminApprovalModule { }
