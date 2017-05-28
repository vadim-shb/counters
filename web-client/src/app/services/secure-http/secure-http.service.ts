import {Injectable} from '@angular/core';
import {ConnectionBackend, Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {PureHttpService} from '../pure-http/pure-http.service';
import {Observable} from 'rxjs';
import {ErrorHandleService} from '../error-handle/error-handle.service';
import {SecurityService} from '../security/security.service';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Injectable()
export class SecureHttpService extends Http {

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private pureHttpService: PureHttpService,
              private securityService: SecurityService,
              private userService: UserService,
              private router: Router,
              private errorHandleService: ErrorHandleService,) {
    super(backend, defaultOptions);
  }

  // Try to get data second time, if UNAUTHORIZED. Possibly access-token expired.
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.ifAuthenticated(() => {
      return this.pureHttpService.get(url, this.modifyOptions(this.securityService.getAccessToken(), options))
        .catch(errorResponse => {
          if (errorResponse.status == 403 || errorResponse.status == 401) {
            return this.securityService.refreshAuthSession()
              .flatMap(() => {
                return this.pureHttpService.get(url, this.modifyOptions(this.securityService.getAccessToken(), options))
              });
          }
          return Observable.throw(errorResponse);
        })
        .catch(errorResponse => {
          return this.errorHandleService.catchHttpError(errorResponse)
        })
    });
  }

  // Try to get data second time, if UNAUTHORIZED. Possibly access-token expired.
  post(url: string, data?: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.ifAuthenticated(() => {
      return this.pureHttpService.post(url, data, this.modifyOptions(this.securityService.getAccessToken(), options))
        .catch(errorResponse => {
          if (errorResponse.status == 403 || errorResponse.status == 401) {
            return this.securityService.refreshAuthSession()
              .flatMap(() => {
                return this.pureHttpService.post(url, data, this.modifyOptions(this.securityService.getAccessToken(), options))
              });
          }
          return Observable.throw(errorResponse);
        })
        .catch(errorResponse => {
          return this.errorHandleService.catchHttpError(errorResponse)
        })
    });
  }

  private ifAuthenticated(callback: () => Observable<Response>): Observable<Response> {
    if (this.securityService.isCurrentUserAuthenticated()) {
      return callback();
    } else {
      this.userService.clearUser();
      this.router.navigate(['/security/sign-in']);
    }
  }

  private modifyOptions(accessToken: string, options?: RequestOptionsArgs): RequestOptionsArgs {
    let result: RequestOptionsArgs;
    if (options) {
      result = Object.assign({}, options);
      if (result.headers) {
        result.headers.append('access-token', accessToken);
      } else {
        result.headers = new Headers({'access-token': accessToken});
      }
    } else {
      result = {headers: new Headers({'access-token': accessToken})};
    }
    return result;
  }
}
