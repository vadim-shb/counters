import {Component, OnInit} from '@angular/core';
import {PureHttpService} from '../../../services/pure-http/pure-http.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/validation/validation.service';
import {Router} from '@angular/router';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.less']
})
export class PasswordRecoveryComponent extends InternationalizedComponent implements OnInit {

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

  constructor(private pureHttp: PureHttpService,
              private fb: FormBuilder,
              private router: Router,
              private validationService: ValidationService,) {
    super();
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
