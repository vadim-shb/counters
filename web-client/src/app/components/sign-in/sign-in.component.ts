import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {Router} from "@angular/router";
import {User} from "../../domain/user";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  credentials: UsernamePasswordCredentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router,
              private securityService: SecurityService) {
  }

  ngOnInit() {
  }

  signIn() {
    this.securityService.signIn(this.credentials)
      .subscribe((user: User | undefined) => {
        if (user) {
          this.router.navigate(['/vacancies']);
        }
      });
  }
}
