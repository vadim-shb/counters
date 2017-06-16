import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../services/security/security.service';
import {UserService} from '../../services/user/user.service';
import {Translation} from '../../modules/i18n/translations/translation';
import {User, UserRole} from '../../domain/security/user';
import {InternationalizedComponent} from '../../modules/i18n/utils/internationalized-component';
import {I18nService} from '../../modules/i18n/i18n.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent extends InternationalizedComponent implements OnInit {

  private user$: Observable<User>;
  private UserRole = UserRole;

  constructor(private securityService: SecurityService,
              private userService: UserService,
              private i18nService: I18nService,
  ) {
    super();
    this.user$ = userService.getUser();
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
