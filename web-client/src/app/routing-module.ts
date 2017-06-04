import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/security/sign-in/sign-in.component';
import {SignUpComponent} from './components/security/sign-up/sign-up.component';
import {PasswordRecoveryComponent} from './components/security/password-recovery/password-recovery.component';
import {MessageScreenComponent} from './components/security/message-screen/message-screen.component';
import {TermsOfUsageComponent} from './components/terms-of-usage/terms-of-usage.component';
import {RootNavigatorComponent} from './components/root/root.component';
import {AdminDashboardComponent} from './components/space-admin/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './components/space-user/user-dashboard/user-dashboard.component';
import {TownsComponent} from 'app/components/space-admin/towns/towns.component';
import {ManagementCompanyComponent} from './components/space-admin/management-company/management-company.component';
import {UserCabinetComponent} from './components/space-shared/user-cabinet/user-cabinet.component';
import {EditUserSpaceComponent} from './components/space-user/user-spaces/edit-user-space/edit-user-space.component';

const ROUTES: Routes = [
  {
    path: '',
    component: RootNavigatorComponent
  },
  {
    path: 'security/sign-in',
    component: SignInComponent
  },
  {
    path: 'security/sign-up',
    component: SignUpComponent
  },
  {
    path: 'security/password-recovery',
    component: PasswordRecoveryComponent
  },
  {
    path: 'security/message/:messageScreenType',
    component: MessageScreenComponent
  },
  {
    path: 'terms',
    component: TermsOfUsageComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'admin/towns',
    component: TownsComponent
  },
  {
    path: 'admin/management-companies',
    component: ManagementCompanyComponent
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'user-cabinet/add-space',
    component: EditUserSpaceComponent
  },
  {
    path: 'user-cabinet/:tab',
    component: UserCabinetComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {
}
