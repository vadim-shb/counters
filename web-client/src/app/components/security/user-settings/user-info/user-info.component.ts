import {Component, OnInit} from '@angular/core';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../domain/security/user';
import {UserService} from '../../../../services/user/user.service';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Http} from '@angular/http';
import {UserResponse} from '../../../../domain/security/success-authentication-response';

@Component({
  selector: 'user-settings__user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {

  private i18n: Translation;
  private userInfoForm: FormGroup;
  private originUserInfo: User;

  get userNameFormControl(): FormControl {
    return this.userInfoForm.get('name') as FormControl;
  };

  get userLanguageFormControl(): FormControl {
    return this.userInfoForm.get('language') as FormControl;
  };

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private i18nService: I18nService,
              private http: Http,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    this.userInfoForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      language: [''],
    });

    userService.getUser()
      .subscribe(user => {
        if (user) {
          this.originUserInfo = user;
          this.userInfoForm.setValue({
            name: user.name,
            language: user.language,
          });
        }
      });
  }

  ngOnInit() {
  }

  isOriginUserInfoChanged() {
    return this.originUserInfo.name != this.userNameFormControl.value ||
      this.originUserInfo.language != this.userLanguageFormControl.value;
  }

  saveUserInfo() {
    if (this.userInfoForm.invalid) {
      this.userNameFormControl.markAsTouched();
      return;
    }
    let userInfoChangeRequest = {
      name: this.userNameFormControl.value,
      language: this.userLanguageFormControl.value,
    };

    this.http.post(`/api/security/current-user/change-info`, userInfoChangeRequest)
      .map(response => response.json() as UserResponse)
      .subscribe(
        (userResponse) => {
          this.userService.setUser(new User(userResponse));
        });
  }

}
