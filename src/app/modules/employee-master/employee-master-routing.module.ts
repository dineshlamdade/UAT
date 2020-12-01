import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankInformationComponent } from './components/bank-information/bank-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { CertificationDetailComponent } from './components/education-skills-information/certification-detail/certification-detail.component';
import { EducationDetailComponent } from './components/education-skills-information/education-detail/education-detail.component';
import { EducationSkillsInformationComponent } from './components/education-skills-information/education-skills-information.component';
import { LanguageDetailComponent } from './components/education-skills-information/language-detail/language-detail.component';
import { SkillsDetailComponent } from './components/education-skills-information/skills-detail/skills-detail.component';
import { BankDetailsComponent } from './components/family-information/bank-details/bank-details.component';
import { FamilyDetailsComponent } from './components/family-information/family-details/family-details.component';
import { FamilyInformationComponent } from './components/family-information/family-information.component';
import { NominationDetailsComponent } from './components/family-information/nomination-details/nomination-details.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { PayrollAreaInformationComponent } from './components/payroll-area-information/payroll-area-information.component';
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
      {
        path: 'payroll-area-information',
        component: PayrollAreaInformationComponent,
        data: { title: ':: DelziaHR :: payroll-area-information' },
      },
      {
        path: 'family-information',
        component: FamilyInformationComponent,
        data: { title: ':: DelziaHR :: family-information' },
        children: [
          {
            path: 'family-details',
            component: FamilyDetailsComponent,
            data: { title: ':: DelziaHR :: family-details' },
          },
          {
            path: 'nomination-details',
            component: NominationDetailsComponent,
            data: { title: ':: DelziaHR :: nomination-details' },
          },
          {
            path: 'bank-details',
            component: BankDetailsComponent,
            data: { title: ':: DelziaHR :: bank-details' },
          }
        ]
      },
      {
        path: 'education-skills-information',
        component: EducationSkillsInformationComponent,
        data: { title: ':: DelziaHR :: education-skills-information' },
        children: [
          {
            path: 'education-details',
            component: EducationDetailComponent,
            data: { title: ':: DelziaHR :: education-details' },
          },
          {
            path: 'skills-details',
            component: SkillsDetailComponent,
            data: { title: ':: DelziaHR :: skills-details' },
          },
          {
            path: 'language-details',
            component: LanguageDetailComponent,
            data: { title: ':: DelziaHR :: language-details' },
          },
          {
            path: 'certification-details',
            component: CertificationDetailComponent,
            data: { title: ':: DelziaHR :: certification-details' },
          }
        ]
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
