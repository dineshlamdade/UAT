import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSmsComponent } from './email-sms/email-sms.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSmsRoutingModule { }
