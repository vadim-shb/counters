import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/security/sign-in/sign-in.component';
import {UserSettingsComponent} from './components/security/user-settings/user-settings.component';
import {SignUpComponent} from './components/security/sign-up/sign-up.component';
import {PasswordRecoveryComponent} from './components/security/password-recovery/password-recovery.component';
import {MessageScreenComponent} from './components/security/message-screen/message-screen.component';
import {TermsOfUsageComponent} from './components/terms-of-usage/terms-of-usage.component';
import {RootNavigatorComponent} from './components/root/root.component';
import {AdminDashboardComponent} from './components/space-admin/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './components/space-user/user-dashboard/user-dashboard.component';
import {TownsComponent} from 'app/components/space-admin/towns/towns.component';

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
    path: 'user/dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'security/user-settings',
    component: UserSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {
}
