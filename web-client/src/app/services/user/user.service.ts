import {Injectable} from "@angular/core";
import {User} from "../../domain/user";

@Injectable()
export class UserService {

  private user: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  clearUser() {
    delete this.user;
  }

}
