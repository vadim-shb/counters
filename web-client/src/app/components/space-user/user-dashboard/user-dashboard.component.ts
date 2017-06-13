import {Component, OnInit} from '@angular/core';
import {Space} from '../../../domain/space';
import {SpaceService} from '../../../services/space/space.service';
import {Count} from '../../../domain/count';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.less']
})
export class UserDashboardComponent extends InternationalizedComponent implements OnInit {

  private spaces: Space[] = [];
  private activeSpaceId: number;
  private countsToAskReadouts: Count[] = [];

  constructor(
    private spaceService: SpaceService,
    private router: Router,
  ) {
    super();

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
