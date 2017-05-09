import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {PasswordRecoveryComponent} from "./components/password-recovery/password-recovery.component";
import {EmailConfirmationSuccessComponent} from "./components/security/email-confirmation-success/email-confirmation-success.component";

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'security/email-confirmation-success',
    component: EmailConfirmationSuccessComponent
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {
}
