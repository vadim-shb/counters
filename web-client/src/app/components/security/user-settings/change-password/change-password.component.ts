import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Translation} from "../../../../modules/i18n/translations/translation";
import {Http} from "@angular/http";
import {I18nService} from "../../../../modules/i18n/i18n.service";
import {ValidationService} from "../../../../services/validation/validation.service";

@Component({
  selector: 'user-settings__change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  private successfulPasswordChange = false;
  private wrongPassword = false;
  private i18n: Translation;
  private passwordChangeForm: FormGroup;

  get currentPasswordFormControl(): FormControl {
    return this.passwordChangeForm.get('currentPassword') as FormControl;
  };

  get newPasswordFormControl(): FormControl {
    return this.passwordChangeForm.get('newPassword') as FormControl;
  };

  get repeatNewPasswordFormControl(): FormControl {
    return this.passwordChangeForm.get('repeatNewPassword') as FormControl;
  };

  constructor(private fb: FormBuilder,
              private i18nService: I18nService,
              private http: Http,
              private validationService: ValidationService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    this.passwordChangeForm = fb.group({
      currentPassword: ['', this.validationService.PASSWORD_VALIDATORS],
      newPassword: ['', this.validationService.PASSWORD_VALIDATORS],
      repeatNewPassword: [''],
    });

    this.repeatNewPasswordFormControl.setValidators(this.validationService.repeatPasswordValidator(() => {
      return this.newPasswordFormControl.value;
    }));
  }

  ngOnInit() {
  }

  changePassword() {
    if (this.passwordChangeForm.invalid) {
      this.currentPasswordFormControl.markAsTouched();
      this.newPasswordFormControl.markAsTouched();
      this.repeatNewPasswordFormControl.markAsTouched();
      return;
    }

    let userPasswordChangeRequest = {
      currentPassword: this.currentPasswordFormControl.value,
      newPassword: this.newPasswordFormControl.value,
    };

    this.http.post(`/api/security/current-user/change-password`, userPasswordChangeRequest)
      .subscribe(
        () => {
          this.passwordChangeForm.setValue({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          });
          this.markFormAsUntouchedAndPending();
          this.successfulPasswordChange = true;
          this.wrongPassword = false;
        },
        errorResponse => {
          if (errorResponse.status == 422) {
            this.markFormAsUntouchedAndPending();
            this.wrongPassword = true;
            this.successfulPasswordChange = false;
          }
        }
      );
  }

  private markFormAsUntouchedAndPending() {
    this.passwordChangeForm.markAsUntouched();
    this.currentPasswordFormControl.markAsPending();
    this.newPasswordFormControl.markAsPending();
    this.repeatNewPasswordFormControl.markAsPending();
  }

}
