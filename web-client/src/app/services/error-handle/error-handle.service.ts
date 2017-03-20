import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ErrorHandleService {

  constructor() { }

  catchHttpError(response: Response) : Observable<Response> {
    // if (response.status == 403) {
    //   this.userService.clearUser();
    //   this.router.navigate(['/sign-in']);
    //   throw "user must be signed in";
    // }
    // if (response.status == 500) {
    //   this.router.navigate(['/error']);
    // }
    return Observable.never();
  }
}
