import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {User} from "../../domain/user";
import {PureHttpService} from "../pure-http/pure-http.service";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {UserService} from "../user/user.service";
import {AuthenticationSession} from "../../domain/authentication-session";
import {SuccessAuthenticationResponse} from "../../domain/success-authentication-response";
import {Router} from "@angular/router";
import {RequestOptionsArgs, Headers} from "@angular/http";

@Injectable()
export class SecurityService {

  private authSession: AuthenticationSession;

  private refreshingSessionProcess?: Subject<undefined>;
  //10 seconds for already started requests, which get 403. So they will not starts new refresh process
  private TIME_GAP_TO_GET_PREVIOUS_REFRESH_TOKEN:number = 10000;

  constructor(private pureHttp: PureHttpService,
              private errorHandleService: ErrorHandleService,
              private router: Router,
              private userService: UserService) {
    this.authSession = JSON.parse(localStorage.getItem('authSession'));
  }

  signIn(credentials: UsernamePasswordCredentials): Observable<User | undefined> {
    return this.pureHttp.post(`/api/security/sign-in/username-password`, credentials)
    // .catch(response => this.errorHandleService.catchHttpError(response)) // todo: handle errors
      .map(response => {
        // if (response.status == 404) {
        //   return undefined;
        // }
        return response.json() as SuccessAuthenticationResponse
      })
      .map(auth => {
        if (auth) {
          this.userService.setUser(auth.user);
          this.setAuthSession(auth.session);
          return auth.user;
        }
      })
  }

  private setAuthSession(authSession: AuthenticationSession): void {
    this.authSession = authSession;
    localStorage.setItem('authSession', JSON.stringify(authSession));
  }

  signOut() {
    this.refreshAuthSession().subscribe(() => {
      let options: RequestOptionsArgs = {headers: new Headers({'access-token': this.authSession.accessToken})};
      this.pureHttp.get(`/api/security/sign-out`, options)
        .subscribe(() => {
          delete this.authSession;
          this.userService.clearUser();
          localStorage.clear();
          this.router.navigate(['/']);
        });
    });
  }

  isCurrentUserAuthenticated(): boolean {
    return !!this.authSession;
  }

  getAccessToken(): string | undefined {
    if (this.authSession) {
      return this.authSession.accessToken;
    }
  }

  refreshAuthSession(): Observable<undefined> {
    if (!this.refreshingSessionProcess) {
      this.refreshingSessionProcess = new ReplaySubject(1);
      this.refreshAuthSessionRequest(this.authSession.refreshToken)
        .subscribe(auth => {
          this.userService.setUser(auth.user);
          this.setAuthSession(auth.session);
          this.refreshingSessionProcess.next();
          setTimeout(() => {
            delete this.refreshingSessionProcess
          }, this.TIME_GAP_TO_GET_PREVIOUS_REFRESH_TOKEN);
        });
    }

    return this.refreshingSessionProcess;
  }

  private refreshAuthSessionRequest(refreshToken: string): Observable<SuccessAuthenticationResponse> {
    return this.pureHttp.post(`/api/security/refresh-auth-session`, refreshToken)
      .catch(response => this.errorHandleService.catchHttpError(response))
      .map(response => {
        // if (response.status == 404) {
        //   return undefined;
        // }
        return response.json() as SuccessAuthenticationResponse;
      })
  }
}
