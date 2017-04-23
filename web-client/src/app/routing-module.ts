import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

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
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {
}
