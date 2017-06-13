import {Injectable} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor() { }

  PASSWORD_VALIDATORS = [Validators.required, Validators.minLength(4), Validators.maxLength(1000)];

  emailValidator(control: AbstractControl): { [key: string]: any } {
    const emailRegexp = /.+@.+/i;
    if (control.value && !emailRegexp.test(control.value)) {
      return {'email': true}
    }
  }

  integerValidator(control: AbstractControl): { [key: string]: any } {
    if (control.value && !Number.isInteger(control.value)) {
      return {'integer': true}
    }
  }

  minNumberValidator(minNumber: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value &&
          typeof control.value == 'number' &&
          control.value < minNumber) {
        return {'minNumber': true}
      }
    }
  }

  maxNumberValidator(maxNumber: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value &&
        typeof control.value == 'number' &&
        control.value > maxNumber) {
        return {'maxNumber': true}
      }
    }
  }

  repeatPasswordValidator(passwordGetter: () => string) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value != passwordGetter()) {
        return {'repeatPassword': true}
      }
    }
  }
}
