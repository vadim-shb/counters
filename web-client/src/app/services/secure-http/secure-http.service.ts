import {Injectable} from "@angular/core";
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {PureHttpService} from "../pure-http/pure-http.service";
import {Observable} from "rxjs";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {SecurityService} from "../security/security.service";

@Injectable()
export class SecureHttpService extends Http {

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private pureHttpService: PureHttpService,
              private securityService: SecurityService,
              private errorHandleService: ErrorHandleService,) {
    super(backend, defaultOptions);
  }

  // Try to get data second time, if UNAUTHORIZED. Possibly access-token expired.
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.pureHttpService.get(url, this.modifyOptions(this.securityService.getAccessToken(), options))
      .catch(response => {
        if (response.status == 403 || response.status == 401) {
          return this.securityService.refreshAuthSession()
            .flatMap(() => this.pureHttpService.get(url, this.modifyOptions(this.securityService.getAccessToken(), options)));
        }
        return response;
      })
      .catch(response => this.errorHandleService.catchHttpError(response));
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
