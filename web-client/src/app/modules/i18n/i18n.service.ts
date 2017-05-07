import {Injectable} from "@angular/core";
import {Lang} from "./domain/lang";
import {EnglishTranslation} from "./english-lang/english.translation";
import {RussianTranslation} from "./russian-lang/russian.translation";
import {Translation} from "./domain/translation";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class I18nService {

  private currentLang: Lang;
  private currentTranslation = new ReplaySubject<Translation>(1);

  constructor(private englishTranslation: EnglishTranslation,
              private russianTranslation: RussianTranslation,) {
    let defaultLang = Lang.RUSSIAN;
    this.setLang(defaultLang);
  }

  setLang(lang: Lang): void {
    if (this.currentLang != lang) {
      this.currentLang = lang;
      if (lang === Lang.ENGLISH) this.currentTranslation.next(this.englishTranslation);
      if (lang === Lang.RUSSIAN) this.currentTranslation.next(this.russianTranslation);
    }
  }

  getCurrentTranslation(): Observable<Translation> {
    return this.currentTranslation;
  }

  getTranslations() : Translation[] {
    return [
      this.russianTranslation,
      this.englishTranslation
    ]
  }

}
