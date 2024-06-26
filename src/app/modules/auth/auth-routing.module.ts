import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorPage2Component } from './error-page2/error-page2.component';
import { PsadminComponentSelectionComponent } from './psadmin-component-selection/psadmin-component-selection.component';
import { GroupOrCompanySelectionComponent } from './group-or-company-selection/group-or-company-selection.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: ':: Epic :: Log In' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: ':: Epic :: Forgot Password' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: ':: Epic :: Register' }
  },
  {
    path: 'error-404',
    component: ErrorPageComponent,
    data: { title: ':: Epic :: Error-404' }
  },
  {
    path: 'error-500',
    component: ErrorPage2Component,
    data: { title: ':: Epic :: Error-500' }
  },
  {
    path: 'userRolePage',
    component: PsadminComponentSelectionComponent,
    data: { title: ':: Epic :: UserRole' }
  },
  {
    path: 'userGroupSelectPage',
    component: GroupOrCompanySelectionComponent,
    data: { title: ':: Epic :: userGroupSelectPage' }
  },
  // {
  //   path: 'psAdminSelection',
  //   component: PsadminComponentSelectionComponent,
  //   data: { title: ':: Epic :: Error-500' }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent
  ];

}