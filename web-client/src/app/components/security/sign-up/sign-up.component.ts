import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/translations/translation";
import {Lang} from "../../../modules/i18n/domain/lang";
import {Router} from "@angular/router";
import {PureHttpService} from "../../../services/pure-http/pure-http.service";
import {ValidationService} from "../../../services/validation/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  private signUpForm: FormGroup;
  private i18n: Translation;
  private alreadyRegisteredEmail: boolean = false;

  get userNameFormControl(): FormControl {
    return this.signUpForm.get('name') as FormControl;
  };

  get passwordFormControl(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  };

  get repeatPasswordFormControl(): FormControl {
    return this.signUpForm.get('repeatPassword') as FormControl;
  };

  get emailFormControl(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  };

  get agreementWithTermsOfUsageFormControl(): FormControl {
    return this.signUpForm.get('agreementWithTermsOfUsage') as FormControl;
  };


  constructor(private fb: FormBuilder,
              private i18nService: I18nService,
              private pureHttp: PureHttpService,
              private router: Router,
              private validationService: ValidationService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
    this.signUpForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, this.validationService.emailValidator, Validators.maxLength(1000)]],
      password: ['', this.validationService.PASSWORD_VALIDATORS],
      repeatPassword: [''],
      language: Lang[Lang.RUSSIAN],
      agreementWithTermsOfUsage: [false, [Validators.requiredTrue]]
    });
    //repeatPasswordValidator uses signUpForm.password
    this.repeatPasswordFormControl.setValidators(this.validationService.repeatPasswordValidator(() => {
      return this.passwordFormControl.value;
    }));
  }

  emailChanges() {
    this.alreadyRegisteredEmail = false;
  }

  ngOnInit() {
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this.userNameFormControl.markAsTouched();
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      this.repeatPasswordFormControl.markAsTouched();
      this.agreementWithTermsOfUsageFormControl.markAsTouched();
      return;
    }
    let signUpRequest = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      language: this.signUpForm.value.language,
    };

    this.pureHttp.post(`/api/security/sign-up`, signUpRequest)
      .subscribe(
        (response) => {
          this.router.navigate(['/security/message/confirmation-email-sent']);
        },
        (errorResponse) => {
          if (errorResponse.status == 409) {
            this.alreadyRegisteredEmail = true;
          }
        });
  }

}
