import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankInformationComponent } from './components/bank-information/bank-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PreviousEmploymentInformationComponent } from './components/previous-employment-information/previous-employment-information.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
        data: { title: ':: DelziaHR :: personal-information' },
      },
      {
        path: 'contact-information',
        component: ContactInformationComponent,
        data: { title: ':: DelziaHR :: contact-information' },
      },
      {
        path: 'identity-information',
        component: IdentityInformationComponent,
        data: { title: ':: DelziaHR :: identity-information' },
      },
      {
        path: 'identity-information',
        component: IdentityInformationComponent,
        data: { title: ':: DelziaHR :: identity-information' },
      },
      {
        path: 'previous-employment-information',
        component: PreviousEmploymentInformationComponent,
        data: { title: ':: DelziaHR :: previous-employment-information' },
      },
      {
        path: 'bank-information',
        component: BankInformationComponent,
        data: { title: ':: DelziaHR :: bank-information' },
      },


    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/employee-master' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeMasterRoutingModule {
  static components = [
  ];

}
