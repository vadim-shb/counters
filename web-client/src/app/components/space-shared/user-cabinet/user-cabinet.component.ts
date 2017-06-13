import {Component, OnInit} from '@angular/core';
import {UserRole} from '../../../domain/security/user';
import {ActivatedRoute, Router} from '@angular/router';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.less']
})
export class UserCabinetComponent extends InternationalizedComponent implements OnInit {

  private UserRole = UserRole;
  private activeTab: string;
  private editSpaceId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,) {
    super();

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
