import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../../services/security/security.service";
import {Router} from "@angular/router";
import {User} from "../../../domain/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/translations/translation";
import {EmailPasswordCredentials} from "../../../domain/email-password-credentials";
import {ValidationService} from "../../../services/validation/validation.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  private wrongEmailOrPassword: boolean = false;
  private i18n: Translation;

  get emailFormControl() { return this.signInForm.get('email') };
  get passwordFormControl() { return this.signInForm.get('password') };

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder,
    private i18nService: I18nService,
    private validationService: ValidationService,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.maxLength(1000),
        this.validationService.emailValidator
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
      this.signInForm.get("email").markAsTouched();
      this.signInForm.get("password").markAsTouched();
      return;
    }
    let credentials : EmailPasswordCredentials = this.signInForm.value;

    this.securityService.signIn(credentials)
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/']);
        }
      }, (errorResponse: Response) => {
        if (errorResponse.status === 401){
          this.wrongEmailOrPassword = true;
        }
      });
  }
}
