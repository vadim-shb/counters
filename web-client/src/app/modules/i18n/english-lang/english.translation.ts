import {Injectable} from "@angular/core";
import {Translation} from "../domain/translation";
import {Lang} from "../domain/lang";

@Injectable()
export class EnglishTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.ENGLISH;
  TRANSLATION_LANGUAGE_CODE = Lang[Lang.ENGLISH];
  TRANSLATION_LANGUAGE_NAME = 'English';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/United-States.png';

  constructor() {
  }

  ui = {
    SIGN_IN: 'Sign In',
    SIGN_OUT: 'Sign Out',
    SIGN_UP: 'Sign Up',
    FORGOT_PASSWORD_QUESTION: 'Forgot password?',
    SETTINGS: 'Settings',
    REPEAT_PASSWORD: 'Repeat password',
  };

  entity = {
    securityUser: {
      NAME: 'Name',
      PASSWORD: 'Password',
      EMAIL: 'Email',
      LANGUAGE: 'Language',
    }
  };

  component = {
    signUp: {
      DO_SIGN_UP: 'Sign Up',
      ALREADY_HAVE_AN_ACCOUNT_QUESTION: 'Already have an account?',
    },
    confirmationEmailSent: {
      TITLE: 'Congratulations!',
      CONFIRMATION_EMAIL_SENT_MESSAGE: "In couple minutes you'll get our email. Please follow the simple instructions in it, and you'll successfully finish the sign up process.",
    },
    emailConfirmationSuccess: {
      WELCOME: 'Welcome!',
      SUCCESSFULLY_EMAIL_CONFIRMED_MESSAGE: 'Your email has been successfully confirmed. Now you could sign in to HR paradise',
    },
    passwordRecovery: {
      RECOVERY_PASSWORD: 'Recovery password',
    },
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
    securityUser: {
      NAME__REQUIRED: 'Name required',
      NAME__CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: 'Name can not be longer than 100 characters',
      EMAIL__REQUIRED: 'Email required',
      EMAIL__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Email can not be longer than 1000 characters',
      EMAIL__INVALID: 'Invalid email',
      PASSWORD__REQUIRED: 'Password required',
      PASSWORD__CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: 'Password can not be shorter than 4 characters',
      PASSWORD__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Password can not be longer than 1000 characters',
      PASSWORD_CONFIRMATION__DO_NOT_MATCH: "Passwords don't match",

      INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password',
      USER_WITH_THIS_EMAIL_HAS_BEEN_ALREADY_SIGNED_UP: 'User with this email has been already signed up',
      USER_WITH_THIS_EMAIL_HAS_NEVER_BEEN_SIGNED_UP: 'User with this email has never been signed up',
    },
  };
}
