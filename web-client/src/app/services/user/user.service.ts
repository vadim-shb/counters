import {Injectable} from "@angular/core";
import {User} from "../../domain/user";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Lang} from "../../modules/i18n/domain/lang";

@Injectable()
export class UserService {

  private userSubject: Subject<User|undefined> = new BehaviorSubject<User|undefined>(undefined);

  constructor(private i18nService: I18nService) {
    this.userSubject.next(JSON.parse(localStorage.getItem('currentUser')));
    this.userSubject.subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        i18nService.setLang(Lang[user.language]);
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
