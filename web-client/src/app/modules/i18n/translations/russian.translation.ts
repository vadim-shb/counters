import {Injectable} from '@angular/core';
import {Translation} from './translation';
import {Lang} from '../domain/lang';
import {EntitySecurityUserRussianTranslation, ModuleSecurityRussianTranslation} from './security/russian.translation';
import {
  EntityCountRussianTranslation,
  EntityManagementCompanyRussianTranslation, EntityReadoutRussianTranslation,
  EntitySpaceRussianTranslation,
  EntityTownRussianTranslation
} from './ent-business-logic/russian.translation';
import {UiSharedRussianTranslation} from './ui-shared/russian.translation';
import {UiAdminRussianTranslation} from './ui-admin/russian.translation';
import {UiUserRussianTranslation} from './ui-user/russian.translation';

@Injectable()
export class RussianTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.RUSSIAN;
  TRANSLATION_LANGUAGE_CODE = Lang[Lang.RUSSIAN];
  TRANSLATION_LANGUAGE_NAME = 'Русский';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/Russia.png';

  constructor() {
  }

  entSecurityUser = new EntitySecurityUserRussianTranslation();
  entTown = new EntityTownRussianTranslation();
  entManagementCompany = new EntityManagementCompanyRussianTranslation();
  entSpace = new EntitySpaceRussianTranslation();
  entCount = new EntityCountRussianTranslation();
  entReadout = new EntityReadoutRussianTranslation();
  uiSecurity = new ModuleSecurityRussianTranslation();
  uiShared = new UiSharedRussianTranslation();
  uiAdmin = new UiAdminRussianTranslation();
  uiUser = new UiUserRussianTranslation();

  httpErrors = {
    SERVER_DO_NOT_RESPOND_HEADER: 'Сервер не отвечает',
    SERVER_DO_NOT_RESPOND_BODY: 'Наш персонал уже работает над решением проблемы. Если проблема не решится в течение нескольких часов, пожалуйста связитесь с администрацией ресурса.',

    COMMUNICATION_PROTOCOL_ERROR_HEADER: 'Ошибка протокола взаимодействия',
    COMMUNICATION_PROTOCOL_ERROR_BODY: 'Bad request.',
  };

}
