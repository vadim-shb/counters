import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'user-spaces',
  templateUrl: './user-spaces.component.html',
  styleUrls: ['./user-spaces.component.less']
})
export class UserSpacesComponent implements OnInit {

  private i18n: Translation;

  constructor(private i18nService: I18nService,
              private fb: FormBuilder,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

  }

  ngOnInit() {
  }

}
