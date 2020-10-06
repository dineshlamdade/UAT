import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedlayoutModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
