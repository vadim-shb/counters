import {Lang} from "./lang";

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;

  ui: {
    USERNAME: string;
    PASSWORD: string;
    SIGN_IN: string;
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

