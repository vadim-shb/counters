import {Lang} from "./lang";

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;
  TRANSLATION_LANGUAGE_NAME: string;
  TRANSLATION_LANGUAGE_FLAG_PATH: string;

  ui: {
    USERNAME: string;
    PASSWORD: string;
    SIGN_IN: string;
    SIGN_OUT: string;
    SIGN_UP: string;
    FORGOT_PASSWORD_QUESTION: string;
    SETTINGS: string;
  };

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
    signInForm: {
      USERNAME_REQUIRED: string;
      USERNAME_CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: string;
      PASSWORD_REQUIRED: string;
      PASSWORD_CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: string;
      PASSWORD_CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: string;
      INCORRECT_USERNAME_OR_PASSWORD: string;
    }
  }
}

