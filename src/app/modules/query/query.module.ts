import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './standard-que-ans/query.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { QueryTypeMasterComponent } from './query-type-master/query-type-master.component';


@NgModule({
  declarations:
  [QueryComponent,
  QueryTypeMasterComponent,
  ],
  imports: [
    CommonModule,
    QueryRoutingModule,
    ReactiveFormsModule,
    SharedlayoutModule,
    CKEditorModule,
    NgxPaginationModule

  ]
})
export class QueryModule { }
