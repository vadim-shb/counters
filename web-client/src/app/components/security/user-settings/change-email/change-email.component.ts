import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {ValidationService} from '../../../../services/validation/validation.service';
import {UserService} from '../../../../services/user/user.service';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'user-settings__change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.less']
})
export class ChangeEmailComponent extends InternationalizedComponent implements OnInit {

  private emailChangeProcessStarts = false;
  private alreadyRegisteredEmail = false;
  private emailChangeForm: FormGroup;
  private originalEmail: string;

  get emailFormControl(): FormControl {
    return this.emailChangeForm.get('email') as FormControl;
  };

  constructor(private fb: FormBuilder,
              private http: Http,
              private userService: UserService,
              private validationService: ValidationService,) {
    super();
  }

  ngOnInit() {
    this.emailChangeForm = this.fb.group({
      email: ['', [Validators.required, this.validationService.emailValidator, Validators.maxLength(1000)]],
    });

    this.userService.getUser()
      .first()
      .subscribe(user => {
        this.emailChangeForm.setValue({
          email: user.email
        });
        this.originalEmail = user.email;
      });
  }

  emailChanges() {
    this.alreadyRegisteredEmail = false;
    this.emailChangeProcessStarts = false;
  }

  isOriginEmailChanged() {
    return this.originalEmail != this.emailChangeForm.get('email').value;
  }

  changeEmail() {
    if (this.emailChangeForm.invalid) {
      this.emailFormControl.markAsTouched();
      return;
    }

    let emailChangeRequest = {
      email: this.emailFormControl.value,
    };

    this.http.post(`/api/security/current-user/change-email`, emailChangeRequest)
      .subscribe(
        () => {
          this.emailChangeProcessStarts = true;
        },
        errorResponse => {
          if (errorResponse.status == 409) {
            this.alreadyRegisteredEmail = true;
          }
        }
      );
  }

}
