import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {ToastService} from '../toast/toast.service';
import {I18nService} from '../../modules/i18n/i18n.service';
import {Translation} from '../../modules/i18n/translations/translation';

@Injectable()
export class ErrorHandleService {

  private i18n: Translation;

  constructor(private router: Router,
              private userService: UserService,
              private toastService: ToastService,
              private i18nService: I18nService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  catchHttpError(response: Response, ignoreErrors: number[] = []): Observable<Response> {
    if (!ignoreErrors.includes(response.status)) {
      if (response.status == 403 || response.status == 401) {
        this.userService.clearUser();
        this.router.navigate(['/security/sign-in']);
        throw 'user must be signed in';
      }
      if (response.status == 500 || response.status == 504) {
        this.toastService.error(this.i18n.httpErrors.SERVER_DO_NOT_RESPOND_HEADER, this.i18n.httpErrors.SERVER_DO_NOT_RESPOND_BODY);
      }
      if (response.status == 400) {
        this.toastService.error(this.i18n.httpErrors.COMMUNICATION_PROTOCOL_ERROR_HEADER, this.i18n.httpErrors.COMMUNICATION_PROTOCOL_ERROR_BODY);
      }
    }
    return Observable.throw(response);
  }

}
