import { Component, OnInit } from '@angular/core';
import {Town} from '../../../domain/town';
import {TownDao} from '../../../dao/town/town.dao';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.less']
})
export class TownsComponent implements OnInit {

  private newTown: Town;
  private towns: Town[] = [];

  // @formatter:off
  constructor(
    private townDao: TownDao,
  ) { }
  // @formatter:on

  ngOnInit() {
    this.newTown = new Town();
    this.townDao.loadAll()
      .subscribe(towns => this.towns = towns);
  }

  clearSavedValue(savedTown) {
    this.newTown = new Town();
  }
}
