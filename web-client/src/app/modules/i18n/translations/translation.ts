import {Lang} from '../domain/lang';
import {EntitySecurityUserTranslation, ModuleSecurityTranslation} from './security/translation';
import {
  EntityCountPointTranslation, EntityBillingCompanyTranslation, EntityReadoutTranslation, EntitySpaceTranslation,
  EntityTownTranslation
} from './ent-business-logic/translation';
import {UiSharedTranslation} from './ui-shared/translation';
import {UiAdminTranslation} from './ui-admin/translation';
import {UiUserTranslation} from './ui-user/translation';

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;
  TRANSLATION_LANGUAGE_CODE: string;
  TRANSLATION_LANGUAGE_NAME: string;
  TRANSLATION_LANGUAGE_FLAG_PATH: string;


  entSecurityUser: EntitySecurityUserTranslation;
  entTown: EntityTownTranslation;
  entBillingCompany: EntityBillingCompanyTranslation;
  entSpace: EntitySpaceTranslation;
  entCountPoint: EntityCountPointTranslation;
  entReadout: EntityReadoutTranslation;
  uiSecurity: ModuleSecurityTranslation;
  uiShared: UiSharedTranslation;
  uiAdmin: UiAdminTranslation;
  uiUser: UiUserTranslation;

  httpErrors: {
    SERVER_DO_NOT_RESPOND_HEADER: string;
    SERVER_DO_NOT_RESPOND_BODY: string;

    COMMUNICATION_PROTOCOL_ERROR_HEADER: string;
    COMMUNICATION_PROTOCOL_ERROR_BODY: string;
  }

}

