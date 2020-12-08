import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankInformationComponent } from './components/bank-information/bank-information.component';
import { ComplianceInformationComponent } from './components/compliance-information/compliance-information.component';
import { ComplianceTypeInformationComponent } from './components/compliance-information/compliance-type-information/compliance-type-information.component';
import { InputComplianceInformationComponent } from './components/compliance-information/input-compliance-information/input-compliance-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { CertificationDetailComponent } from './components/education-skills-information/certification-detail/certification-detail.component';
import { EducationDetailComponent } from './components/education-skills-information/education-detail/education-detail.component';
import { EducationSkillsInformationComponent } from './components/education-skills-information/education-skills-information.component';
import { LanguageDetailComponent } from './components/education-skills-information/language-detail/language-detail.component';
import { SkillsDetailComponent } from './components/education-skills-information/skills-detail/skills-detail.component';
import { EmploymentInformationComponent } from './components/employment-information/employment-information.component';
import { ExitInformationComponent } from './components/employment-information/exit-information/exit-information.component';
import { JoiningInformationComponent } from './components/employment-information/joining-information/joining-information.component';
import { ReJoiningInformationComponent } from './components/employment-information/re-joining-information/re-joining-information.component';
import { TransferInformationComponent } from './components/employment-information/transfer-information/transfer-information.component';
import { BankDetailsComponent } from './components/family-information/bank-details/bank-details.component';
import { FamilyDetailsComponent } from './components/family-information/family-details/family-details.component';
import { FamilyInformationComponent } from './components/family-information/family-information.component';
import { NominationDetailsComponent } from './components/family-information/nomination-details/nomination-details.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { DeputationDetailComponent } from './components/job-information/deputation-detail/deputation-detail.component';
import { JobInformationComponent } from './components/job-information/job-information.component';
import { MinimumWagesDetailComponent } from './components/job-information/minimum-wages-detail/minimum-wages-detail.component';
import { OrganizationDetailComponent } from './components/job-information/organization-detail/organization-detail.component';
import { PositionDetailComponent } from './components/job-information/position-detail/position-detail.component';
import { ProjectDetailComponent } from './components/job-information/project-detail/project-detail.component';
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
      {
        path: 'job-information',
        component: JobInformationComponent,
        data: { title: ':: DelziaHR :: job-information' },
        children: [
          {
            path: 'organization-details',
            component: OrganizationDetailComponent,
            data: { title: ':: DelziaHR :: organization-details' },
          },
          {
            path: 'position-details',
            component: PositionDetailComponent,
            data: { title: ':: DelziaHR :: position-details' },
          },
          {
            path: 'project-details',
            component: ProjectDetailComponent,
            data: { title: ':: DelziaHR :: project-details' },
          },
          {
            path: 'minimum-wages-details',
            component: MinimumWagesDetailComponent,
            data: { title: ':: DelziaHR :: minimum-wages-details' },
          },
          {
            path: 'deputation-details',
            component: DeputationDetailComponent,
            data: { title: ':: DelziaHR :: deputation-details' },
          }
        ]
      },
      {
        path: 'compliance-information',
        component: ComplianceInformationComponent,
        data: { title: ':: DelziaHR :: compliance-information' },
        children: [
          {
            path: 'input',
            component: InputComplianceInformationComponent,
            data: { title: ':: DelziaHR :: input' },
          },
          {
            path: 'compliance-type',
            component: ComplianceTypeInformationComponent,
            data: { title: ':: DelziaHR :: compliance-type' },
          },
        ]
      },
      {
        path: 'employment-information',
        component: EmploymentInformationComponent,
        data: { title: ':: DelziaHR :: employment-information' },
        children: [
          {
            path: 'joining-information',
            component: JoiningInformationComponent,
            data: { title: ':: DelziaHR :: joining-information' },
          },
          {
            path: 're-joining-information',
            component: ReJoiningInformationComponent,
            data: { title: ':: DelziaHR :: re-joining-information' },
          },
          {
            path: 'transfer-information',
            component: TransferInformationComponent,
            data: { title: ':: DelziaHR :: transfer-information' },
          },
          {
            path: 'exit-information',
            component: ExitInformationComponent,
            data: { title: ':: DelziaHR :: exit-information' },
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
