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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSliderModule } from '@angular/material/slider';
import { AttributeCreationComponent } from './attribute-creation/attribute-creation.component';
import { CompanySettingRoutingModule } from './companysetting.routing.module';
import { CompanySettingComponent } from './companysetting.component';
import { pipe } from 'rxjs';
// import {TableModule} from 'primeng/table';
// import {ButtonModule} from 'primeng/button';
// import { CustomerService } from './payroll/financial-master/customerservice';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
// import { UserRoleComponent } from './user-rolesand-permission/user-role/user-role.component';
// import { UserGroupComponent } from './user-rolesand-permission/user-group/user-group.component';
// import { UserRolesandPermissionComponent } from './user-rolesand-permission/user-rolesand-permission.component';
// import { RolePrivilegeComponent } from './user-rolesand-permission/role-privilege/role-privilege.component';

// import { HttpClientModule } from '@angular/common/http';
import { BusinessYearComponent } from './business-cycle/business-year/business-year.component';
import { CycleDefinitionComponent } from './business-cycle/cycle-definition/cycle-definition.component';
import { CycleCreationComponent } from './business-cycle/cycle-creation/cycle-creation.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { DeclarationFormComponent } from './declaration-form/declaration-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
import { ReimbursementMasterComponent } from './reimbursement-master/reimbursement-master.component';
import { RembComputationComponent } from './reimbursement-master/remb-computation/remb-computation.component';
import { RembGeneralComponent } from './reimbursement-master/remb-general/remb-general.component';
import { RembSummaryComponent } from './reimbursement-master/remb-summary/remb-summary.component';
@NgModule( {
  declarations: [
    HeadCreationComponent,
    PayrollHeadGroupCreationComponent,
    BusinessCycleComponent,
    AttributeSelectionComponent,
    AttributeCreationComponent,
    BusinessYearComponent,
    CycleDefinitionComponent,
    CycleCreationComponent,
    RegisterFormComponent,
    ClaimFormComponent,
    DeclarationFormComponent,
    SummaryFormComponent,
    ReimbursementMasterComponent,
    RembComputationComponent,
    RembGeneralComponent,
    RembSummaryComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot( {
      positionClass: 'toast-top-center',
    } ),
    SharedlayoutModule,

    CompanySettingRoutingModule,
    TableModule,

    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,

    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,

  ],

  providers: [DatePipe, NumberFormatPipe],

} )
export class CompanySettingModule { }

