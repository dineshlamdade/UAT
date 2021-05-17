import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './standard-que-ans/query.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { QueryTypeMasterComponent } from './query-type-master/query-type-master.component';
import { CKEditorModule } from 'ckeditor4-angular';
import {TableModule} from 'primeng/table';
import { AdminQuryGenerationComponent } from './admin-qury-generation/admin-qury-generation.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CalendarModule} from 'primeng/calendar';
import { QueryDashboardComponent } from './query-dashboard/query-dashboard.component';
import {ChartModule} from 'primeng/chart';
import { NgApexchartsModule } from "ng-apexcharts";
import {SidebarModule} from 'primeng/sidebar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { NodeService } from './nodeservice.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {TreeModule} from 'primeng/tree';

// import { QueryCOmmunicationComponent } from './query-communication/query-communication.component';


// import { ChartComponent } from "ng-apexcharts";
@NgModule({
  declarations:
  [QueryComponent,
  QueryTypeMasterComponent,
  AdminQuryGenerationComponent,
  QueryDashboardComponent,
  // QueryCOmmunicationComponent,
  ],
  imports: [
    TreeModule,
    CommonModule,
    QueryRoutingModule,
    ReactiveFormsModule,
    SharedlayoutModule,
    NgxPaginationModule,
    CKEditorModule,
    TableModule,
    CalendarModule,
    BsDatepickerModule,
    ChartModule,
    NgApexchartsModule,
    SidebarModule,
    ScrollPanelModule,
    NgMultiSelectDropDownModule.forRoot(),


    // ChartComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [NodeService]

})
export class QueryModule { }
