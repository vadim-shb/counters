import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, BehaviorSubject} from "rxjs";
import {User} from "../../domain/user";
import {PureHttpService} from "../pure-http/pure-http.service";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {UserService} from "../user/user.service";
import {AuthenticationSession} from "../../domain/authentication-session";
import * as moment from 'moment';
import {SuccessAuthenticationResponse} from "../../domain/success-authentication-response";

@Injectable()
export class SecurityService {

  private authSession: AuthenticationSession;

  private refreshSessionLock = false;
  private previousSessionWaitSteps = 0;

  constructor(private pureHttp: PureHttpService,
              // private errorHandleService: ErrorHandleService,
              private userService: UserService) {
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
      .map(auth=> {
        if (auth) {
          this.userService.setUser(auth.user);
          this.authSession = auth.session;
          return auth.user;
        }
      })
  }

  getAccessToken(): Observable<string|undefined> {
    let accessTokenExpirationTime = moment(this.authSession.accessTokenExpirationTime);
    if (accessTokenExpirationTime.isAfter(moment().add(5, 'm'))) {
      return new BehaviorSubject(this.authSession.accessToken)
    } else {
      if (!this.refreshSessionLock) {
        return this.refreshAuthSession();
      } else {
        return this.waitPreviousRefreshFinish();
      }
    }
  }

  private waitPreviousRefreshFinish() {
    this.previousSessionWaitSteps++;
    if (this.previousSessionWaitSteps > 30){
      throw 'Max level of tryings. Can\'t refresh authentication session.';
    }
    let result = new ReplaySubject<string|undefined>(1);
    setTimeout(() => {
      this.getAccessToken()
        .subscribe(accessToken => result.next(accessToken));
    }, 100 * (this.previousSessionWaitSteps + 1));
    return result;
  }

  private refreshAuthSession() {
    this.refreshSessionLock = true;
    return this.refreshAuthSessionRequest(this.authSession.refreshToken)
      .map(authSession => {
        this.authSession = authSession;
        return authSession.refreshToken;
      })
      .finally(() => {
        this.refreshSessionLock = false;
        this.previousSessionWaitSteps = 0;
      });
  }

  private refreshAuthSessionRequest(refreshToken: string): Observable<AuthenticationSession | undefined> {
    return this.pureHttp.post(`/api/security/refresh-auth-session`, refreshToken)
      // .catch(response => this.errorHandleService.catchHttpError(response))
      .map(response => {
        // if (response.status == 404) {
        //   return undefined;
        // }
        return response.json() as AuthenticationSession
      })
  }
}
