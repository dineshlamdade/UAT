import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { AlertModule } from 'ngx-bootstrap/alert';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { CollapseModule } from 'ngx-bootstrap/collapse';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { PopoverModule } from 'ngx-bootstrap/popover';
// import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ToastrModule } from 'ngx-toastr';
// import { NumberFormatPipe } from '../../core/utility/pipes/NumberFormatPipe';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { MatSliderModule } from '@angular/material/slider';
import { ApprovedInvestmentRoutingModule } from './approved-investment-routing.module';
import { ApprovedInvestmentComponent} from './approved-investment.component';
import { ApprovedsecondComponent } from './approvedsecond/approvedsecond.component';
import { ApprovedthirdComponent } from './approvedthird/approvedthird.component';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component'



@NgModule({
  declarations: [ApprovedInvestmentComponent, ApprovedsecondComponent, ApprovedthirdComponent, DocumentviewerComponent],
  imports: [
    CommonModule,
    ApprovedInvestmentRoutingModule,
    SharedlayoutModule,
    MatSliderModule,
    // NumberFormatPipe,
     TooltipModule,
    // ProgressbarModule,PopoverModule,
     ModalModule,
     TableModule,
     MultiSelectModule,
    // BsDropdownModule,
    // BsDatepickerModule,
    // CollapseModule,
    // CarouselModule,
    // AlertModule,
    // AccordionModule,
   
    // ToastrModule



  ]
})
export class ApprovedInvestmentModule { }
