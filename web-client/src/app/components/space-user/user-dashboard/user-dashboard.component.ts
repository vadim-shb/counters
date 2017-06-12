import {Component, OnInit} from '@angular/core';
import {Space} from '../../../domain/space';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {SpaceService} from '../../../services/space/space.service';
import {Count} from '../../../domain/count';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.less']
})
export class UserDashboardComponent implements OnInit {

  private i18n: Translation;
  private spaces: Space[] = [];
  private activeSpaceId: number;
  private countsToAskReadouts: Count[] = [];

  constructor(private i18nService: I18nService,
              private spaceService: SpaceService,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    this.spaceService.loadCurrentUserSpaces()
      .subscribe(spaces => {
        this.spaces = spaces;
        if (spaces[0]) {
          this.activeSpaceId = spaces[0].id;
          this.countsToAskReadouts = spaces[0].counts;
        }
      });
  }

  ngOnInit() {
  }

  activeSpaceChanges() {
    this.spaces
      .filter(space => space.id === this.activeSpaceId)
      .forEach(space => this.countsToAskReadouts = space.counts);
  }

}
