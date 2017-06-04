import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ConnectionBackend, Http, HttpModule, XHRBackend} from '@angular/http';
import {RootComponent, RootNavigatorComponent} from './components/root/root.component';
import {SignInComponent} from './components/security/sign-in/sign-in.component';
import {RoutingModule} from './routing-module';
import {UserService} from './services/user/user.service';
import {PureHttpService} from './services/pure-http/pure-http.service';
import {SecureHttpService} from './services/secure-http/secure-http.service';
import {ErrorHandleService} from './services/error-handle/error-handle.service';
import {SecurityService} from './services/security/security.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from 'angular2-moment';
import {ResumeDao} from './dao/resume/resume.dao';
import {HeaderComponent} from './components/header/header.component';
import {ToasterModule} from 'angular2-toaster';
import {ToastService} from './services/toast/toast.service';
import {I18nModule} from './modules/i18n/i18n.module';
import {UserSettingsComponent} from './components/security/user-settings/user-settings.component';
import {SignUpComponent} from './components/security/sign-up/sign-up.component';
import {PasswordRecoveryComponent} from './components/security/password-recovery/password-recovery.component';
import {ValidationService} from './services/validation/validation.service';
import {MessageScreenComponent} from './components/security/message-screen/message-screen.component';
import {TermsOfUsageComponent} from './components/terms-of-usage/terms-of-usage.component';
import {UserInfoComponent} from './components/security/user-settings/user-info/user-info.component';
import {ChangeEmailComponent} from './components/security/user-settings/change-email/change-email.component';
import {ChangePasswordComponent} from './components/security/user-settings/change-password/change-password.component';
import {AdminDashboardComponent} from './components/space-admin/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './components/space-user/user-dashboard/user-dashboard.component';
import {MaterialModule} from './modules/material.module';
import {TownsComponent} from './components/space-admin/towns/towns.component';
import {EditTownLineComponent} from './components/space-admin/towns/edit-town-line/edit-town-line.component';
import {UserHasRolesDirective} from './directives/user-has-roles/user-has-roles.directive';
import {UserHasAnyRoleDirective} from './directives/user-has-any-role/user-has-any-role.directive';
import {TownDao} from './dao/town/town.dao';
import {ManagementCompanyComponent} from './components/space-admin/management-company/management-company.component';
import {EditManagementCompanyLineComponent} from './components/space-admin/management-company/edit-management-company-line/edit-management-company-line.component';
import {ManagementCompanyDao} from './dao/management-company/management-company.dao';
import { UserCabinetComponent } from './components/space-shared/user-cabinet/user-cabinet.component';

@NgModule({
  declarations: [
    RootComponent,
    SignInComponent,
    HeaderComponent,
    UserSettingsComponent,
    SignUpComponent,
    PasswordRecoveryComponent,
    MessageScreenComponent,
    TermsOfUsageComponent,
    UserInfoComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    RootNavigatorComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    TownsComponent,
    EditTownLineComponent,
    UserHasRolesDirective,
    UserHasAnyRoleDirective,
    ManagementCompanyComponent,
    EditManagementCompanyLineComponent,
    UserCabinetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    ToasterModule,
    RoutingModule,
    MomentModule,
    I18nModule,
  ],
  providers: [
    ToastService,
    SecurityService,
    UserService,
    ErrorHandleService,
    ValidationService,
    {provide: ConnectionBackend, useClass: XHRBackend},
    PureHttpService,
    {provide: Http, useClass: SecureHttpService},
    ResumeDao,
    TownDao,
    ManagementCompanyDao,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
