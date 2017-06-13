import {Component, OnInit} from '@angular/core';
import {InternationalizedComponent} from '../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'app-terms-of-usage',
  templateUrl: './terms-of-usage.component.html',
  styleUrls: ['./terms-of-usage.component.less']
})
export class TermsOfUsageComponent extends InternationalizedComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
