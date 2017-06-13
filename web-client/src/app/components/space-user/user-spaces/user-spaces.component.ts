import {Component, OnInit} from '@angular/core';
import {Space} from '../../../domain/space';
import {SpaceService} from '../../../services/space/space.service';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'user-spaces',
  templateUrl: './user-spaces.component.html',
  styleUrls: ['./user-spaces.component.less']
})
export class UserSpacesComponent extends InternationalizedComponent implements OnInit {

  private spaces: Space[] = [];

  constructor(private spaceService: SpaceService,) {
    super();

    this.spaceService.loadCurrentUserSpaces()
      .subscribe(spaces => this.spaces = spaces);
  }

  ngOnInit() {
  }


}
