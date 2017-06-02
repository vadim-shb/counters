import {Component, Input, OnInit} from '@angular/core';
import {Town} from '../../../../domain/town';

@Component({
  selector: 'edit-town-line',
  templateUrl: './edit-town-line.component.html',
  styleUrls: ['./edit-town-line.component.less']
})
export class EditTownLineComponent implements OnInit {

  @Input() private town: Town;

  constructor() {
  }

  ngOnInit() {
  }

}
