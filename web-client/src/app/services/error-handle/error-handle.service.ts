import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {ToastService} from "../toast/toast.service";

@Injectable()
export class ErrorHandleService {

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
  ) {
  }

  catchHttpError(response: Response, ignoreErrors: number[] = []): Observable<Response> {
    if (!ignoreErrors.includes(response.status)) {
      if (response.status == 403 || response.status == 401) {
        this.userService.clearUser();
        this.router.navigate(['/sign-in']);
        throw 'user must be signed in';
      }
      if (response.status == 500 || response.status == 504) {
        this.toastService.error('Server do not respond', 'Our personal is already solving this issue. Please, contact the administration of this site if it still unavailable in couple hours.');
      }
      if (response.status == 400) {
        this.toastService.error('Communication protocol error', 'Bad request.');
      }
      return Observable.never();
    }
    return Observable.throw(response);
  }

}
