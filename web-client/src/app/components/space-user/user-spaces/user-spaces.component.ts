import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {Space} from '../../../domain/space';
import {SpaceService} from '../../../services/space/space.service';

@Component({
  selector: 'user-spaces',
  templateUrl: './user-spaces.component.html',
  styleUrls: ['./user-spaces.component.less']
})
export class UserSpacesComponent implements OnInit {

  private i18n: Translation;
  private spaces: Space[] = [];

  constructor(private i18nService: I18nService,
              private spaceService: SpaceService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    this.spaceService.loadCurrentUserSpaces()
      .subscribe(spaces => this.spaces = spaces);
  }

  ngOnInit() {
  }


}
