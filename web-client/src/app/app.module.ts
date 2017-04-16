import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, Http, XHRBackend, ConnectionBackend} from "@angular/http";
import {RootComponent} from "./components/root/root.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {RoutingModule} from "./routing-module";
import {MaterialModule} from "@angular/material";
import {UserService} from "./services/user/user.service";
import {PureHttpService} from "./services/pure-http/pure-http.service";
import {SecureHttpService} from "./services/secure-http/secure-http.service";
import {ErrorHandleService} from "./services/error-handle/error-handle.service";
import {SecurityService} from "./services/security/security.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    RootComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [
    SecurityService,
    UserService,
    ErrorHandleService,
    {provide: ConnectionBackend, useClass: XHRBackend},
    PureHttpService,
    {provide: Http, useClass: SecureHttpService}
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
