import { Component, OnInit } from '@angular/core';
import {Town} from '../../../domain/town';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.less']
})
export class TownsComponent implements OnInit {

  private newTown: Town;

  constructor() { }

  ngOnInit() {
    this.newTown = new Town();
  }

}
