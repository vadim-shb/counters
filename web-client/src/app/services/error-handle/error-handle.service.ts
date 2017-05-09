import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {ToastService} from "../toast/toast.service";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Translation} from "../../modules/i18n/domain/translation";

@Injectable()
export class ErrorHandleService {

  private i18n: Translation;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private i18nService: I18nService,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  catchHttpError(response: Response, ignoreErrors: number[] = []): Observable<Response> {
    if (!ignoreErrors.includes(response.status)) {
      let i18nHttpErrors = this.i18n.errorMessages.http;
      if (response.status == 403 || response.status == 401) {
        this.userService.clearUser();
        this.router.navigate(['/security/sign-in']);
        throw 'user must be signed in';
      }
      if (response.status == 500 || response.status == 504) {
        this.toastService.error(i18nHttpErrors.SERVER_DO_NOT_RESPOND.HEADER, i18nHttpErrors.SERVER_DO_NOT_RESPOND.BODY);
      }
      if (response.status == 400) {
        this.toastService.error(i18nHttpErrors.COMMUNICATION_PROTOCOL_ERROR.HEADER, i18nHttpErrors.COMMUNICATION_PROTOCOL_ERROR.BODY);
      }
      return Observable.never();
    }
    return Observable.throw(response);
  }

}
