import {Component, OnInit} from "@angular/core";
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/domain/translation";

@Component({
  selector: 'app-email-confirmation-success',
  templateUrl: './email-confirmation-success.component.html',
  styleUrls: ['./email-confirmation-success.component.less']
})
export class EmailConfirmationSuccessComponent implements OnInit {

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
