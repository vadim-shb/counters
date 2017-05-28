import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {PureHttpService} from '../../../services/pure-http/pure-http.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/validation/validation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.less']
})
export class PasswordRecoveryComponent implements OnInit {

  private i18n: Translation;
  private recoveryPasswordForm: FormGroup;
  private neverSignedUpEmail = false;

  get emailFormControl() {
    return this.recoveryPasswordForm.get('email')
  };

  get passwordFormControl(): FormControl {
    return this.recoveryPasswordForm.get('password') as FormControl;
  };

  get repeatPasswordFormControl(): FormControl {
    return this.recoveryPasswordForm.get('repeatPassword') as FormControl;
  };

  constructor(private i18nService: I18nService,
              private pureHttp: PureHttpService,
              private fb: FormBuilder,
              private router: Router,
              private validationService: ValidationService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
    this.recoveryPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.maxLength(1000),
        this.validationService.emailValidator
      ]],
      password: ['', this.validationService.PASSWORD_VALIDATORS],
      repeatPassword: ['', []],
    });
    //repeatPasswordValidator uses recoveryPasswordForm.password
    this.repeatPasswordFormControl.setValidators(this.validationService.repeatPasswordValidator(() => {
      return this.passwordFormControl.value;
    }));
  }

  emailChanges() {
    this.neverSignedUpEmail = false;
  }

  recoveryPassword() {
    if (this.recoveryPasswordForm.invalid) {
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      this.repeatPasswordFormControl.markAsTouched();
      return;
    }

    let passwordRecoveryRequest = {
      email: this.recoveryPasswordForm.value.email,
      password: this.recoveryPasswordForm.value.password,
    };

    this.pureHttp.post(`/api/security/recovery-password-by-email`, passwordRecoveryRequest)
      .subscribe(
        () => {
          this.router.navigate(['/security/message/password-recovery-email-sent']);
        },
        (errorResponse: Response) => {
          if (errorResponse.status == 404) {
            this.neverSignedUpEmail = true;
          }
        });
  }
}
