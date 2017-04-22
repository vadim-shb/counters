import {Injectable} from "@angular/core";
import {User} from "../../domain/user";

@Injectable()
export class UserService {

  private user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearUser() {
    delete this.user;
    localStorage.removeItem('currentUser');
  }

}
