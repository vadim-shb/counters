import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {Router} from "@angular/router";
import {User} from "../../domain/user";
import {UsernamePasswordCredentials} from "../../domain/username-password-credentials";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Translation} from "../../modules/i18n/domain/translation";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  private wrongUsernamePassword: boolean = false;
  private i18n: Translation;

  get usernameFormControl() { return this.signInForm.get('username') };
  get passwordFormControl() { return this.signInForm.get('password') };

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder,
    private i18nService: I18nService,
  ) {
    i18nService.getTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
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
