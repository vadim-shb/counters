import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../domain/user";
import {PureHttpService} from "../pure-http/pure-http.service";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {SuccessAuthenticationResponse} from "../../domain/authentication-response";
import {UserService} from "../user/user.service";

@Injectable()
export class SecurityService {

  constructor(private pureHttp: PureHttpService,
              private errorHandleService: ErrorHandleService,
              private userService: UserService) {
  }

  signIn(credentials: UsernamePasswordCredentials): Observable<User | undefined> {
    return this.pureHttp.post(`/api/security/sign-in`, credentials)
      .catch(response => this.errorHandleService.catchHttpError(response))
      .map(response => {
        if (response.status == 404) {
          return undefined;
        }
        return response.json() as SuccessAuthenticationResponse
      })
      .map(auth => {
        if (auth) {
          this.userService.setUser(auth.user);
          this.userService.setAccessToken(auth.accessToken);
          return auth.user
        }
      })
  }
}
