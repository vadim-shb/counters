import { Component, OnInit } from '@angular/core';
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/domain/translation";

@Component({
  selector: 'app-confirmation-email-sent',
  templateUrl: './confirmation-email-sent.component.html',
  styleUrls: ['./confirmation-email-sent.component.less']
})
export class ConfirmationEmailSentComponent implements OnInit {

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
