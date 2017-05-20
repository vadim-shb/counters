import {EntitySecurityUserTranslation, ModuleSecurityTranslation} from "./translation";

export class EntitySecurityUserEnglishTranslation implements EntitySecurityUserTranslation {

  NAME = 'Name';
  PASSWORD = 'Password';
  EMAIL = 'Email';
  LANGUAGE = 'Language';

  // ==== errors ====
  NAME__REQUIRED = 'Name required';
  NAME__CAN_NOT_BE_LONGER_THAN_100_CHARACTERS = 'Name can not be longer than 100 characters';
  EMAIL__REQUIRED = 'Email required';
  EMAIL__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS = 'Email can not be longer than 1000 characters';
  EMAIL__INVALID = 'Invalid email';
  PASSWORD__REQUIRED = 'Password required';
  PASSWORD__CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS = 'Password can not be shorter than 4 characters';
  PASSWORD__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS = 'Password can not be longer than 1000 characters';
  PASSWORD_CONFIRMATION__DO_NOT_MATCH = "Passwords don't match";
}

export class ModuleSecurityEnglishTranslation implements ModuleSecurityTranslation {
  SIGN_IN = 'Sign In';
  SIGN_OUT = 'Sign Out';
  SIGN_UP = 'Sign Up';
  FORGOT_PASSWORD_QUESTION = 'Forgot password?';
  SETTINGS = 'Settings';
  REPEAT_PASSWORD = 'Repeat password';
  REPEAT_NEW_PASSWORD = 'Repeat new password';
  TO_THE_MAIN_PAGE = 'Go to the main page';
  DO_SIGN_UP = 'Sign Up';
  ALREADY_HAVE_AN_ACCOUNT_QUESTION = 'Already have an account?';
  RECOVERY_PASSWORD = 'Recovery password';
  NEW_PASSWORD = 'New password';
  CURRENT_PASSWORD = 'Current password';
  USER_INFO = 'User info';
  CHANGE_PASSWORD = 'Change password';
  PASSWORD_CHANGE_SUCCESS = 'Password successfully changed';
  WRONG_PASSWORD = 'Wrong password';

  AGREE_WITH = 'Agree with';
  TERMS = 'terms';
  OF_USAGE = 'of usage';

  CONFIRMATION_EMAIL_SENT_TITLE = 'Congratulations!';
  CONFIRMATION_EMAIL_SENT_MESSAGE = "In couple minutes you'll get our email. Please follow the simple instructions in it; and you'll successfully finish the sign up process.";

  PASSWORD_RECOVERY_EMAIL_SENT_TITLE = 'Password recovery email has been sent';
  PASSWORD_RECOVERY_EMAIL_SENT_MESSAGE = 'Follow the simple instructions in the email to finish password recovery process';

  PASSWORD_RECOVERY_SUCCESS_TITLE = 'Password was successfully recovered';
  PASSWORD_RECOVERY_SUCCESS_MESSAGE = 'Now you can sign in with the new password';

  PASSWORD_RECOVERY_ERROR_TITLE = 'Password recovery process expired';
  PASSWORD_RECOVERY_ERROR_MESSAGE = 'Recovery letter not valid any more';

  EMAIL_CONFIRMATION_SUCCESS_TITLE = 'Welcome!';
  EMAIL_CONFIRMATION_SUCCESS_MESSAGE = 'Your email has been successfully confirmed. Now you could sign in to HR paradise';


  // ==== errors ====
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';
  USER_WITH_THIS_EMAIL_HAS_BEEN_ALREADY_SIGNED_UP = 'User with this email has been already signed up';
  USER_WITH_THIS_EMAIL_HAS_NEVER_BEEN_SIGNED_UP = 'User with this email has never been signed up';
  NEED_USER_AGREEMENT_WITH_TERMS_TO_SIGN_UP = 'Need user agreement with terms of usage to sign up';

}
