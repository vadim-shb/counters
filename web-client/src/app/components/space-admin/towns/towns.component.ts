import {Component, OnInit} from '@angular/core';
import {Town} from '../../../domain/town';
import {TownDao} from '../../../dao/town/town.dao';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.less']
})
export class TownsComponent implements OnInit {

  private newTown: Town;
  private towns$: Observable<Town[]>;

  // @formatter:off
  constructor(
    private townDao: TownDao,
  ) { }
  // @formatter:on

  ngOnInit() {
    this.renewComponent();
  }

  renewComponent() {
    this.newTown = new Town();
    this.renewTowns();
  }

  renewTowns() {
    this.towns$ = this.townDao.loadAll();
  }
}
