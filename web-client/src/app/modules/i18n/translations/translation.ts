import {Lang} from '../domain/lang';
import {EntitySecurityUserTranslation, ModuleSecurityTranslation} from './security/translation';
import {
  EntityCountTranslation, EntityManagementCompanyTranslation, EntitySpaceAddressTranslation,
  EntityTownTranslation
} from './ent-business-logic/translation';
import {UiSharedTranslation} from './ui-shared/translation';
import {UiAdminTranslation} from './ui-admin/translation';

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;
  TRANSLATION_LANGUAGE_CODE: string;
  TRANSLATION_LANGUAGE_NAME: string;
  TRANSLATION_LANGUAGE_FLAG_PATH: string;


  entSecurityUser: EntitySecurityUserTranslation;
  entTown: EntityTownTranslation;
  entManagementCompany: EntityManagementCompanyTranslation;
  entSpaceAddress: EntitySpaceAddressTranslation;
  entCount: EntityCountTranslation;
  uiSecurity: ModuleSecurityTranslation;
  uiShared: UiSharedTranslation;
  uiAdmin: UiAdminTranslation;

  httpErrors: {
    SERVER_DO_NOT_RESPOND_HEADER: string;
    SERVER_DO_NOT_RESPOND_BODY: string;

    COMMUNICATION_PROTOCOL_ERROR_HEADER: string;
    COMMUNICATION_PROTOCOL_ERROR_BODY: string;
  }

}

