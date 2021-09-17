import { PrimeNGModule } from './../../app.primeNG.module';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialComponent } from './angularMaterial/angularMaterial.component';
import { PtimeNGPracticeComponent } from './ptimeNGPractice/ptimeNGPractice.component';
import { WorkflowMasterComponent } from './workflowMaster/workflowMaster.component';
import { workflowRoutingModule } from './workflow.routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { NumberFormatPipe } from '../../core/utility/pipes/NumberFormatPipe';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { workflowService } from './workflow.service';
import {StepsModule} from 'primeng/steps';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { yesNoPipeModule } from '../../core/utility/pipes/yesNoPipe/yesNo.pipe.module';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [
    WorkflowMasterComponent,
    PtimeNGPracticeComponent,
    AngularMaterialComponent,
  ],
  imports: [
    workflowRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    yesNoPipeModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    StepsModule,
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
    TableModule
  ],

  providers: [ DatePipe, NumberFormatPipe, workflowService,
  {provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}],

})
export class workflowModule { }
