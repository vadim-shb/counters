import { Injectable } from '@angular/core';
import {User} from "../../domain/user";

@Injectable()
export class UserService {

  private user: User;
  private accessToken: string;

  constructor() { }

  setUser(user: User) {
    this.user = user;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  clearUser() {
    delete this.user;
    delete this.accessToken;
  }
}
