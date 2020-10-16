import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { IdentityInformationComponent } from './identity-information/identity-information.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';

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
