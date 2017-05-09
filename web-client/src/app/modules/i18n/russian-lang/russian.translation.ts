import {Injectable} from "@angular/core";
import {Translation} from "../domain/translation";
import {Lang} from "../domain/lang";

@Injectable()
export class RussianTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.RUSSIAN;
  TRANSLATION_LANGUAGE_CODE = Lang[Lang.RUSSIAN];
  TRANSLATION_LANGUAGE_NAME = 'Русский';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/Russia.png';

  constructor() {
  }

  ui = {
    SIGN_IN: 'Вход',
    SIGN_OUT: 'Выход',
    SIGN_UP: 'Регистрация',
    FORGOT_PASSWORD_QUESTION: 'Забыли пароль?',
    SETTINGS: 'Настройки',
    REPEAT_PASSWORD: 'Повторите пароль',
  };

  entity = {
    securityUser: {
      NAME: 'Имя',
      PASSWORD: 'Пароль',
      EMAIL: 'Email',
      LANGUAGE: 'Язык',
    }
  };

  component = {
    signUp: {
      DO_SIGN_UP: 'Зарегистрироваться',
      ALREADY_HAVE_AN_ACCOUNT_QUESTION: 'Уже есть аккаунт?',
    },
    confirmationEmailSent: {
      TITLE: 'Поздравляем!',
      CONFIRMATION_EMAIL_SENT_MESSAGE: "В течение нескольких минут вы получите email. Пожалуйста, следуйте простым инструкция из письма и вы успешно завершите процеcc регистрации.",
    },
    emailConfirmationSuccess: {
      WELCOME: 'Добро пожаловать!',
      SUCCESSFULLY_EMAIL_CONFIRMED_MESSAGE: 'Ваш email был успешно подтвержден. Теперь вы можете войти в HR paradise',
    },
    passwordRecovery: {
      RECOVERY_PASSWORD: 'Восстановить пароль',
    },
  };

  errorMessages = {
    http: {
      SERVER_DO_NOT_RESPOND: {
        HEADER: 'Сервер не отвечает',
        BODY: 'Наш персонал уже работает над решением проблемы. Если проблема не решится в течение нескольких часов, пожалуйста связитесь с администрацией ресурса.',
      },
      COMMUNICATION_PROTOCOL_ERROR: {
        HEADER: 'Ошибка протокола взаимодействия',
        BODY: 'Bad request.',
      },
    },
    securityUser: {
      NAME__REQUIRED: 'Имя не может быть пустым',
      NAME__CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: 'Имя не может быть длинее 100 символов',
      EMAIL__REQUIRED: 'Email не может быть пустым',
      EMAIL__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Email не может быть длинее 1000 символов',
      EMAIL__INVALID: 'Не верный email',
      PASSWORD__REQUIRED: 'Пароль не может быть пустым',
      PASSWORD__CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: 'Пароль не может быть короче 4 символов',
      PASSWORD__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Пароль не может быть длинее 1000 символов',
      PASSWORD_CONFIRMATION__DO_NOT_MATCH: 'Пароли не совпадают',

      INCORRECT_EMAIL_OR_PASSWORD: 'Не верно введен email или пароль',
      USER_WITH_THIS_EMAIL_HAS_BEEN_ALREADY_SIGNED_UP: 'Пользователь с данным email уже зарегистрирован',
      USER_WITH_THIS_EMAIL_HAS_NEVER_BEEN_SIGNED_UP: 'Пользователь с данным email не зарегистрирован',
    },
  };
}
