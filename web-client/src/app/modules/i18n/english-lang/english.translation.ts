import {Injectable} from "@angular/core";
import {Translation} from "../domain/translation";
import {Lang} from "../domain/lang";

@Injectable()
export class EnglishTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.ENGLISH;
  TRANSLATION_LANGUAGE_NAME = 'English';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/United-States.png';

  constructor() {
  }

  ui = {
    USERNAME: 'Username',
    PASSWORD: 'Password',
    SIGN_IN: 'Sign In',
  };


  errorMessages = {
    http: {
      SERVER_DO_NOT_RESPOND: {
        HEADER: 'Server do not respond',
        BODY: 'Our personal is already solving this issue. Please, contact the administration of this site if it still unavailable in couple hours.',
      },
      COMMUNICATION_PROTOCOL_ERROR: {
        HEADER: 'Communication protocol error',
        BODY: 'Bad request.',
      },
    },
    signInForm: {
      USERNAME_REQUIRED: 'Username required',
      USERNAME_CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: 'Username can not be longer than 100 characters',
      PASSWORD_REQUIRED: 'Password required',
      PASSWORD_CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: 'Password can not be shorter than 4 characters',
      PASSWORD_CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Password can not be longer than 1000 characters',
      INCORRECT_USERNAME_OR_PASSWORD: 'Incorrect username or password',
    }
  };
}
