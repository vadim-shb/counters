import {Lang} from '../domain/lang';
import {EntitySecurityUserTranslation, ModuleSecurityTranslation} from '../../../components/security/translation';

export interface Translation {
  TRANSLATION_LANGUAGE: Lang;
  TRANSLATION_LANGUAGE_CODE: string;
  TRANSLATION_LANGUAGE_NAME: string;
  TRANSLATION_LANGUAGE_FLAG_PATH: string;


  SAVE: string;
  securityUser: EntitySecurityUserTranslation;
  security: ModuleSecurityTranslation;

  httpErrors: {
    SERVER_DO_NOT_RESPOND_HEADER: string;
    SERVER_DO_NOT_RESPOND_BODY: string;

    COMMUNICATION_PROTOCOL_ERROR_HEADER: string;
    COMMUNICATION_PROTOCOL_ERROR_BODY: string;
  }

}

