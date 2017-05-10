import {Component, OnInit} from "@angular/core";
import {SecurityService} from "../../services/security/security.service";
import {UserService} from "../../services/user/user.service";
import {I18nService} from "../../modules/i18n/i18n.service";
import {Translation} from "../../modules/i18n/translations/translation";
import {User} from "../../domain/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private i18n: Translation;
  private user?: User;

  constructor(private securityService: SecurityService,
              private userService: UserService,
              private i18nService: I18nService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    userService.getUser()
      .subscribe(user => {
        this.user = user;
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
