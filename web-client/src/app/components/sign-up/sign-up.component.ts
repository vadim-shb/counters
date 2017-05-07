import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Translation} from "../../modules/i18n/domain/translation";
import {Lang} from "../../modules/i18n/domain/lang";
import {Router} from "@angular/router";
import {PureHttpService} from "../../services/pure-http/pure-http.service";
import {ValidationService} from "../../services/validation/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  private signUpForm: FormGroup;
  private i18n: Translation;

  get userNameFormControl() {
    return this.signUpForm.get('name')
  };

  get passwordFormControl() {
    return this.signUpForm.get('password')
  };

  get repeatPasswordFormControl() {
    return this.signUpForm.get('repeatPassword')
  };

  get emailFormControl() {
    return this.signUpForm.get('email')
  };


  constructor(private fb: FormBuilder,
              private i18nService: I18nService,
              private pureHttp: PureHttpService,
              private router: Router,
              private validationService: ValidationService,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;

      });
    this.signUpForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, this.validationService.emailValidator, Validators.maxLength(1000)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(1000)]],
      repeatPassword: ['', []],
      language: Lang[Lang.RUSSIAN]
    });
    //repeatPasswordValidator uses signUpForm
    this.signUpForm.get('repeatPassword').setValidators(this.repeatPasswordValidator());
  }

  ngOnInit() {
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.get("name").markAsTouched();
      this.signUpForm.get("email").markAsTouched();
      this.signUpForm.get("password").markAsTouched();
      this.signUpForm.get("repeatPassword").markAsTouched();
      return;
    }
    let signUpRequest = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      name: this.signUpForm.value.name,
      language: this.signUpForm.value.language,
    };

    this.pureHttp.post(`/api/security/sign-up`, signUpRequest)
      .subscribe(response => {
        this.router.navigate(['/sign-up-success']);
      });
  }

  private repeatPasswordValidator() {
    let signUpForm = this.signUpForm;
    console.log(signUpForm);
    return (control: AbstractControl): { [key: string]: any } => {
      const emailRegexp = /.+@.+/i;
      if (control.value != signUpForm.get('password').value) {
        return {'repeatPassword': true}
      }
    }
  }

}
