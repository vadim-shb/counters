import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {Router} from "@angular/router";
import {User} from "../../services/security/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router,
              private securityService: SecurityService) {
  }

  ngOnInit() {
  }

  signIn() {
    this.securityService.signIn(this.username, this.password)
      .subscribe((user: User | undefined) => {
        if (user) {
          this.router.navigate(['/vacancies']);
        }
      });
  }
}
