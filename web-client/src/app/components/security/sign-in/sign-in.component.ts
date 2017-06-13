import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../services/security/security.service';
import {Router} from '@angular/router';
import {User} from '../../../domain/security/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailPasswordCredentials} from '../../../domain/security/email-password-credentials';
import {ValidationService} from '../../../services/validation/validation.service';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent extends InternationalizedComponent implements OnInit {

  private signInForm: FormGroup;
  private wrongEmailOrPassword: boolean = false;

  get emailFormControl() {
    return this.signInForm.get('email')
  };

  get passwordFormControl() {
    return this.signInForm.get('password')
  };

  constructor(private router: Router,
              private securityService: SecurityService,
              private fb: FormBuilder,
              private validationService: ValidationService,) {
    super()
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.maxLength(1000),
        this.validationService.emailValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(1000),
      ]],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.get('email').markAsTouched();
      this.signInForm.get('password').markAsTouched();
      return;
    }
    let credentials: EmailPasswordCredentials = this.signInForm.value;

    this.securityService.signIn(credentials)
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/']);
        }
      }, (errorResponse: Response) => {
        if (errorResponse.status === 401) {
          this.wrongEmailOrPassword = true;
        }
      });
  }
}
