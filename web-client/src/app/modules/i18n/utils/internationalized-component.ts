import {Translation} from '../translations/translation';
import {I18nService} from '../i18n.service';
import {GlobalInjectors} from '../../../app.module';

export class InternationalizedComponent {

  protected i18n: Translation;

  constructor() {
    let i18nService: I18nService = GlobalInjectors.I18nModuleInjector.get(I18nService);
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

}
