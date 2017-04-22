import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../domain/user";
import {PureHttpService} from "../pure-http/pure-http.service";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {UserService} from "../user/user.service";
import {AuthenticationSession} from "../../domain/authentication-session";
import {SuccessAuthenticationResponse} from "../../domain/success-authentication-response";

@Injectable()
export class SecurityService {

  private authSession: AuthenticationSession;

  constructor(private pureHttp: PureHttpService,
              private errorHandleService: ErrorHandleService,
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
      .map(auth => {
        if (auth) {
          this.userService.setUser(auth.user);
          this.authSession = auth.session;
          return auth.user;
        }
      })
  }

  getAccessToken(): string | undefined {
    if (this.authSession) {
      return this.authSession.accessToken;
    }
  }

  private refreshingSessionProcess?: Observable<undefined>;

  refreshAuthSession(): Observable<undefined> {
    if (!this.refreshingSessionProcess) {
      this.refreshingSessionProcess = this.refreshAuthSessionRequest(this.authSession.refreshToken)
        .map(auth => {
          this.userService.setUser(auth.user);
          this.authSession = auth.session;
        })
        .finally(() => {
        //todo: check if works correctly on two close refreshes
          delete this.refreshingSessionProcess;
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
