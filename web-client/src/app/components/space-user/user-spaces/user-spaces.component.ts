import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../../modules/i18n/i18n.service';
import {Translation} from '../../../modules/i18n/translations/translation';
import {Space} from '../../../domain/space';
import {SpaceDao} from '../../../dao/space-dao/space.dao';
import {TownDao} from '../../../dao/town/town.dao';

@Component({
  selector: 'user-spaces',
  templateUrl: './user-spaces.component.html',
  styleUrls: ['./user-spaces.component.less']
})
export class UserSpacesComponent implements OnInit {

  private i18n: Translation;
  private spaces: Space[] = [];

  constructor(private i18nService: I18nService,
              private townDao: TownDao,
              private spaceDao: SpaceDao,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
    this.loadUserSpaces();
  }

  private loadUserSpaces() {
    this.townDao.loadAll()
      .subscribe(towns => {
        this.spaceDao.findCurrentUserSpaces()
          .subscribe(spaces => {
            spaces.forEach(space => {
              let townName = towns.filter(town => town.id == space.townId)[0].name;
              space.fullAddress = `${townName}, ${space.address}`;
            });
            spaces.sort((s1, s2) => s1.fullAddress.localeCompare(s2.fullAddress));
            this.spaces = spaces;
          });
      });
  }

}
