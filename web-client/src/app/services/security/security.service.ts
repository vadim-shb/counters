import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "./authentication-result";

@Injectable()
export class SecurityService {

  constructor() { }

  signIn(username: string, password: string) : Observable<User | undefined> {
    return new BehaviorSubject(undefined);
  }
}
