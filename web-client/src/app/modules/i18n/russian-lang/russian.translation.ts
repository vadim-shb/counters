import {Injectable} from "@angular/core";
import {Translation} from "../domain/translation";
import {Lang} from "../domain/lang";

@Injectable()
export class RussianTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.RUSSIAN;
  TRANSLATION_LANGUAGE_NAME = 'Русский';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/Russia.png';

  constructor() {
  }

  ui = {
    USERNAME: 'Логин',
    PASSWORD: 'Пароль',
    SIGN_IN: 'Вход',
    SIGN_OUT: 'Выход',
    SETTINGS: 'Настройки',
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
    signInForm: {
      USERNAME_REQUIRED: 'Логин не может быть пустым',
      USERNAME_CAN_NOT_BE_LONGER_THAN_100_CHARACTERS: 'Логин не может быть длинее 100 символов',
      PASSWORD_REQUIRED: 'Пароль не может быть пустым',
      PASSWORD_CAN_NOT_BE_SHORTER_THAN_4_CHARACTERS: 'Пароль не может быть короче 4 символов',
      PASSWORD_CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: 'Пароль не может быть длинее 1000 символов',
      INCORRECT_USERNAME_OR_PASSWORD: 'Не верно введен логин или пароль',
    }
  };
}
