import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {I18nService} from "./i18n.service";
import {EnglishTranslation} from "./translations/english.translation";
import {RussianTranslation} from "./translations/russian.translation";

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
}
