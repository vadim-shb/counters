import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../modules/i18n/i18n.service';
import {Translation} from '../../modules/i18n/translations/translation';

@Component({
  selector: 'app-terms-of-usage',
  templateUrl: './terms-of-usage.component.html',
  styleUrls: ['./terms-of-usage.component.less']
})
export class TermsOfUsageComponent implements OnInit {

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
