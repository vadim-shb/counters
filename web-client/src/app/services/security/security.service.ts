import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../../domain/user";
import {PureHttpService} from "../pure-http/pure-http.service";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";

@Injectable()
export class SecurityService {

  constructor(private pureHttp: PureHttpService) { }

  signIn(credentials: UsernamePasswordCredentials) : Observable<User | undefined> {
    // this.pureHttp.post(`/api/security/sign-in`);
    return new BehaviorSubject(undefined);
  }
}
