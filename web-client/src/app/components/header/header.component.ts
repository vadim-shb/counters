import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {UserService} from "../../services/user/user.service";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Translation} from "../../modules/i18n/domain/translation";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private i18n: Translation;

  constructor(private securityService: SecurityService,
              private userService: UserService,
              private i18nService: I18nService,) {
    i18nService.getTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
  }

  signOut() {
    this.securityService.signOut();
  }

  langSelected(translation: Translation) {
    this.i18nService.setLang(translation.TRANSLATION_LANGUAGE);
  }


}
