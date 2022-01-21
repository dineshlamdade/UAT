import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LMSLeaveHeadCreationComponentComponent } from './lmsleave-head-creation-component/lmsleave-head-creation-component.component';
import { LmsLeaveAttributeCreationComponent } from './lms-leave-attribute-creation/lms-leave-attribute-creation.component';
import { LeaveAttributeGroupComponent } from './leave-attribute-group/leave-attribute-group.component';



@NgModule({
  declarations: [LMSLeaveHeadCreationComponentComponent, LmsLeaveAttributeCreationComponent, LeaveAttributeGroupComponent],
  imports: [
    CommonModule
  ]
})
export class LmsModule { }
