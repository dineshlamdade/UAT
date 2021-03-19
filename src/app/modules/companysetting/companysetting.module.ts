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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSliderModule } from '@angular/material/slider';

import { payrollComponent } from './bc/bc.component';
import {HeadcreationComponent} from './headcreation/headcreation.component';
import {AttributecreationComponent} from './attributecreation/attributecreation.component';
import {AttributeselectionComponent} from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';
import { CompanySettingRoutingModule } from './companysetting.routing.module';
import { CompanySettingComponent } from './companysetting.component';
import { pipe } from 'rxjs';
// import {TableModule} from 'primeng/table';
// import {ButtonModule} from 'primeng/button';
// import { CustomerService } from './payroll/financial-master/customerservice';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import { UserRoleComponent } from './user-rolesand-permission/user-role/user-role.component';
import { UserGroupComponent } from './user-rolesand-permission/user-group/user-group.component';
import { UserRolesandPermissionComponent } from './user-rolesand-permission/user-rolesand-permission.component';
import { RolePrivilegeComponent } from './user-rolesand-permission/role-privilege/role-privilege.component';



@NgModule({
  declarations: [
    payrollComponent,
    HeadcreationComponent,
    AttributecreationComponent,
    AttributeselectionComponent,
    PayrollheadgroupcreationComponent,
    CompanySettingComponent,
    UserRolesandPermissionComponent,
    UserRoleComponent,
    UserGroupComponent,
    RolePrivilegeComponent,
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
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
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

  providers: [ DatePipe, NumberFormatPipe],
  // providers: [ DatePipe, NumberFormatPipe,CustomerService],


})
export class CompanySettingModule { }

