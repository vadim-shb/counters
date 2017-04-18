import {Injectable} from "@angular/core";
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {PureHttpService} from "../pure-http/pure-http.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {SecurityService} from "../security/security.service";

@Injectable()
export class SecureHttpService extends Http {

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private pureHttpService: PureHttpService,
              private securityService: SecurityService,
              private router: Router,
              private errorHandleService: ErrorHandleService,) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.securityService.getAccessToken()
      .flatMap(accessToken => {
        if (accessToken) {
          return this.pureHttpService.get(url, this.modifyOptions(accessToken, options))
            .catch(response => this.errorHandleService.catchHttpError(response))
        }
        else {
          this.notSignedInUserErrorHandler();
          return Observable.empty() as Observable<Response>;
        }
      });
  }

  private notSignedInUserErrorHandler(): void {
    this.router.navigate(['/sign-in']);
  }

  private modifyOptions(accessToken: string, options?: RequestOptionsArgs): RequestOptionsArgs {
    let result: RequestOptionsArgs;
    if (options) {
      result = Object.assign({}, options);
      if (result.headers) {
        result.headers.append('Authorization', accessToken);
      } else {
        result.headers = new Headers({'Authorization': accessToken});
      }
    } else {
      result = {headers: new Headers({'Authorization': accessToken})};
    }
    return result;
  }
}
