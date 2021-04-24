import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSmsRoutingModule } from './email-sms-routing.module';
import { EmailSmsComponent } from './email-sms/email-sms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [EmailSmsComponent],
  imports: [
    CommonModule,
    EmailSmsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    SharedlayoutModule
  ]
})
export class EmailSmsModule { }
