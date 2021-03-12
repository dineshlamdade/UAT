import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query/query.component';


@NgModule({
  declarations: [QueryComponent],
  imports: [
    CommonModule,
    QueryRoutingModule
  ]
})
export class QueryModule { }
