import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {I18nService} from './i18n.service';
import {EnglishTranslation} from './translations/english.translation';
import {RussianTranslation} from './translations/russian.translation';
import {GlobalInjectors} from '../../app.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    I18nService,
    EnglishTranslation,
    RussianTranslation,
  ],
})
export class I18nModule {
  constructor(private injector: Injector){
    GlobalInjectors.I18nModuleInjector = injector;
  }
}
