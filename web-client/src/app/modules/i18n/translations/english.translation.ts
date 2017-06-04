import {Injectable} from '@angular/core';
import {Translation} from './translation';
import {Lang} from '../domain/lang';
import {
  EntitySecurityUserEnglishTranslation,
  ModuleSecurityEnglishTranslation
} from '../../../components/security/english.translation';
import {EntityManagementCompanyEnglishTranslation, EntityTownEnglishTranslation} from '../../../domain/i18n/english.translation';
import {UiSharedEnglishTranslation} from '../../../components/space-shared/english.translation';

@Injectable()
export class EnglishTranslation implements Translation {

  TRANSLATION_LANGUAGE = Lang.ENGLISH;
  TRANSLATION_LANGUAGE_CODE = Lang[Lang.ENGLISH];
  TRANSLATION_LANGUAGE_NAME = 'English';
  TRANSLATION_LANGUAGE_FLAG_PATH = 'assets/flags/24/United-States.png';

  constructor() {
  }

  entSecurityUser = new EntitySecurityUserEnglishTranslation();
  entTown = new EntityTownEnglishTranslation();
  entManagementCompany = new EntityManagementCompanyEnglishTranslation();
  uiSecurity = new ModuleSecurityEnglishTranslation();
  uiShared = new UiSharedEnglishTranslation();

  httpErrors = {
    SERVER_DO_NOT_RESPOND_HEADER: 'Server do not respond',
    SERVER_DO_NOT_RESPOND_BODY: 'Our personal is already solving this issue. Please, contact the administration of this site if it still unavailable in couple hours.',

    COMMUNICATION_PROTOCOL_ERROR_HEADER: 'Communication protocol error',
    COMMUNICATION_PROTOCOL_ERROR_BODY: 'Bad request.',
  };

}
