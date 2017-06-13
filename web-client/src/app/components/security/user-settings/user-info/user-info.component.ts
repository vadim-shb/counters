import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../domain/security/user';
import {UserService} from '../../../../services/user/user.service';
import {Http} from '@angular/http';
import {UserResponse} from '../../../../domain/security/success-authentication-response';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';
import {I18nService} from '../../../../modules/i18n/i18n.service';

@Component({
  selector: 'user-settings__user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent extends InternationalizedComponent implements OnInit {

  private userInfoForm: FormGroup;
  private originUserInfo: User;

  get userNameFormControl(): FormControl {
    return this.userInfoForm.get('name') as FormControl;
  };

  get userLanguageFormControl(): FormControl {
    return this.userInfoForm.get('language') as FormControl;
  };

  constructor(private i18nService: I18nService,
              private fb: FormBuilder,
              private userService: UserService,
              private http: Http,) {
    super();

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
