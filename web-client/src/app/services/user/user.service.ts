import {Injectable} from "@angular/core";
import {User} from "../../domain/user";
import {Observable, Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {

  private userSubject: Subject<User|undefined> = new BehaviorSubject<User|undefined>(undefined);

  constructor() {
    this.userSubject.next(JSON.parse(localStorage.getItem('currentUser')));
    this.userSubject.subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next();
  }

  getUser(): Observable<User|undefined> {
    return this.userSubject;
  }
}
