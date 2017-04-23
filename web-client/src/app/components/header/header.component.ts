import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {UserService} from "../../services/user/user.service";
import {Observable} from "rxjs";
import {User} from "../../domain/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private user: Observable<User|undefined>;

  constructor(
    private securityService: SecurityService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  signOut() {
    this.securityService.signOut();
  }
}
