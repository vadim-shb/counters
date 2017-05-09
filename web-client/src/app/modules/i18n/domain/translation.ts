import {Lang} from "./lang";

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;
  TRANSLATION_LANGUAGE_CODE: string;
  TRANSLATION_LANGUAGE_NAME: string;
  TRANSLATION_LANGUAGE_FLAG_PATH: string;

  ui: {
    SIGN_IN: string;
    SIGN_OUT: string;
    SIGN_UP: string;
    FORGOT_PASSWORD_QUESTION: string;
    SETTINGS: string;
    REPEAT_PASSWORD: string;
  };

  entity : {
    securityUser: {
      NAME: string;
      PASSWORD: string;
      EMAIL: string;
      LANGUAGE: string;
    }
  };

  component: {
    signUp: {
      DO_SIGN_UP: string;
      ALREADY_HAVE_AN_ACCOUNT_QUESTION: string;
    },
    confirmationEmailSent: {
      TITLE: string;
      CONFIRMATION_EMAIL_SENT_MESSAGE: string;
    },
    emailConfirmationSuccess: {
      WELCOME: string;
      SUCCESSFULLY_EMAIL_CONFIRMED_MESSAGE: string;
    },
  }

  errorMessages: {
    http: {
      SERVER_DO_NOT_RESPOND: {
        HEADER: string;
        BODY: string;
      },
      COMMUNICATION_PROTOCOL_ERROR: {
        HEADER: string;
        BODY: string;
      },
    },
    securityUser: {
      NAME__REQUIRED: string;
      NAME__CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: string;
      EMAIL__REQUIRED: string;
      EMAIL__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: string;
      EMAIL__INVALID: string;
      PASSWORD__REQUIRED: string;
      PASSWORD__CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: string;
      PASSWORD__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: string;
      PASSWORD_CONFIRMATION__DO_NOT_MATCH: string;

      INCORRECT_EMAIL_OR_PASSWORD: string;
      USER_WITH_THIS_EMAIL_HAS_BEEN_ALREADY_SIGNED_UP: string;
    }
  };
}

