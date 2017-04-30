import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {Router} from "@angular/router";
import {User} from "../../domain/user";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  private wrongUsernamePassword: boolean = false;

  get usernameFormControl() { return this.signInForm.get('username') };
  get passwordFormControl() { return this.signInForm.get('password') };

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.maxLength(100),
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(1000),
      ]],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.get("username").markAsTouched();
      this.signInForm.get("password").markAsTouched();
      return;
    }
    let credentials : UsernamePasswordCredentials = this.signInForm.value;

    this.securityService.signIn(credentials)
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/dashboard']);
        }
      }, (errorResponse: Response) => {
        if (errorResponse.status === 401){
          this.wrongUsernamePassword = true;
        }
      });
  }
}
