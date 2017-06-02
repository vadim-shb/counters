import {Injectable} from '@angular/core';
import {Translation} from './translation';
import {Lang} from '../domain/lang';
import {
  EntitySecurityUserRussianTranslation,
  ModuleSecurityRussianTranslation
} from '../../../components/security/russian.translation';
import {EntityTownRussianTranslation} from '../../../domain/i18n/russian.translation';

@Injectable()
export class RussianTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.RUSSIAN;
  TRANSLATION_LANGUAGE_CODE = Lang[Lang.RUSSIAN];
  TRANSLATION_LANGUAGE_NAME = 'Русский';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/Russia.png';

  constructor() {
  }

  SAVE = 'Сохранить';

  securityUser = new EntitySecurityUserRussianTranslation();
  town = new EntityTownRussianTranslation();
  security = new ModuleSecurityRussianTranslation();


  httpErrors = {
    SERVER_DO_NOT_RESPOND_HEADER: 'Сервер не отвечает',
    SERVER_DO_NOT_RESPOND_BODY: 'Наш персонал уже работает над решением проблемы. Если проблема не решится в течение нескольких часов, пожалуйста связитесь с администрацией ресурса.',

    COMMUNICATION_PROTOCOL_ERROR_HEADER: 'Ошибка протокола взаимодействия',
    COMMUNICATION_PROTOCOL_ERROR_BODY: 'Bad request.',
  };

}
