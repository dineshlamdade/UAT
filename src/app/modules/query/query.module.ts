import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './standard-que-ans/query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { QueryTypeMasterComponent } from './query-type-master/query-type-master.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations:
  [QueryComponent,
  QueryTypeMasterComponent,
  ],
  imports: [
    CommonModule,
    QueryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedlayoutModule,
    NgxPaginationModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class QueryModule { }
