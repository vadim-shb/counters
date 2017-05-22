import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/security/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserSettingsComponent} from "./components/security/user-settings/user-settings.component";
import {SignUpComponent} from "./components/security/sign-up/sign-up.component";
import {PasswordRecoveryComponent} from "./components/security/password-recovery/password-recovery.component";
import {MessageScreenComponent} from "./components/security/message-screen/message-screen.component";
import {TermsOfUsageComponent} from "./components/terms-of-usage/terms-of-usage.component";

const ROUTES: Routes = [
  {
    //todo: change default screen for different roles
    path: '',
    redirectTo: '/security/sign-in',
    pathMatch: 'full'
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
    path: 'dashboard',
    component: DashboardComponent
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
