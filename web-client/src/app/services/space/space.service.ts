import {Injectable} from '@angular/core';
import {SpaceDao} from '../../dao/space-dao/space.dao';
import {TownDao} from '../../dao/town/town.dao';
import {Observable} from 'rxjs/Observable';
import {Space} from '../../domain/space';

@Injectable()
export class SpaceService {

  constructor(private townDao: TownDao,
              private spaceDao: SpaceDao,) {
  }

  loadCurrentUserSpaces(): Observable<Space[]> {
    return this.townDao.loadAll()
      .flatMap(towns => {
        return this.spaceDao.loadCurrentUserSpaces()
          .map(spaces => {
            spaces.forEach(space => {
              let townName = towns.filter(town => town.id == space.townId)[0].name;
              space.fullAddress = `${townName}, ${space.address}`;
            });
            spaces.sort((s1, s2) => s1.fullAddress.localeCompare(s2.fullAddress));
            return spaces;
          });
      });
  }
}
