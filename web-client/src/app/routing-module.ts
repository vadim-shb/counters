import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/security/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserSettingsComponent} from "./components/security/user-settings/user-settings.component";
import {SignUpComponent} from "./components/security/sign-up/sign-up.component";
import {PasswordRecoveryComponent} from "./components/security/password-recovery/password-recovery.component";
import {MessageScreenComponent} from "./components/security/message-screen/message-screen.component";

const ROUTES: Routes = [
  {
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
