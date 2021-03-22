import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query/query.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations:
  [QueryComponent,
  ],
  imports: [
    CommonModule,
    QueryRoutingModule,
    ReactiveFormsModule,
    SharedlayoutModule,
    CKEditorModule,


  ]
})
export class QueryModule { }
