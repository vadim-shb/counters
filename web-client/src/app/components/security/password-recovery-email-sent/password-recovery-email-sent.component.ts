import { Component, OnInit } from '@angular/core';
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/domain/translation";

@Component({
  selector: 'app-password-recovery-email-sent',
  templateUrl: './password-recovery-email-sent.component.html',
  styleUrls: ['./password-recovery-email-sent.component.less']
})
export class PasswordRecoveryEmailSentComponent implements OnInit {

  private i18n: Translation;

  constructor(private i18nService: I18nService) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
  }

}
