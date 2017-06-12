import { Component, OnInit } from '@angular/core';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {UserRole} from '../../../domain/security/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.less']
})
export class UserCabinetComponent implements OnInit {

  private UserRole = UserRole;
  private i18n: Translation;
  private activeTab: string;
  private editSpaceId: number;

  constructor(
    private i18nService: I18nService,
    private route: ActivatedRoute,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    route.params.subscribe(params => {
      this.activeTab = params.tab;
      if (this.activeTab === 'space') {
        if (params.id === 'new') {
          this.editSpaceId = null;
        } else {
          this.editSpaceId = params.id;
        }
      }
    });
  }

  ngOnInit() {
  }

}
