import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable()
export class ValidationService {

  constructor() { }

  emailValidator(control: AbstractControl): { [key: string]: any } {
    const emailRegexp = /.+@.+/i;
    if (control.value && !emailRegexp.test(control.value)) {
      return {'email': true}
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
