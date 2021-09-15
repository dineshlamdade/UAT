import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
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

import {SidebarModule} from 'primeng/sidebar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MultiSelectModule} from 'primeng/multiselect';



import { FormulamasterRoutingModule } from './formulamaster-routing.module';
import { FormulamasterComponent } from './formulamaster.component';
import { KeywordmasterComponent } from './keywordmaster/keywordmaster.component';
import { FormulacreationComponent } from './formulacreation/formulacreation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { NgSelectModule } from '@ng-select/ng-select'; 



@NgModule({
  declarations: [FormulamasterComponent,KeywordmasterComponent,FormulacreationComponent],
  imports: [
    CommonModule,
    FormulamasterRoutingModule,
    SharedlayoutModule,
    AccordionModule,
    AlertModule,
    CarouselModule,
    CollapseModule,
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
    PopoverModule,
    ProgressbarModule,
    TooltipModule,
    ToastrModule,
    SidebarModule,
    ScrollPanelModule,
    TableModule,
    NgMultiSelectDropDownModule,
    MultiSelectModule,
    SharedlayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // AutocompleteLibModule
    // NgSelectModule 
  ]
})
export class FormulamasterModule { }
