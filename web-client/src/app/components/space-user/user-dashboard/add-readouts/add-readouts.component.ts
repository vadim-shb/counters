import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Count, Readout} from '../../../../domain/count';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ReadoutDao} from '../../../../dao/readout/readout.dao';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'add-readouts',
  templateUrl: './add-readouts.component.html',
  styleUrls: ['./add-readouts.component.less']
})
export class AddReadoutsComponent extends InternationalizedComponent implements OnInit, OnChanges {

  @Input() counts: Count[];
  @Output() onSave = new EventEmitter();

  private readoutsForm: FormArray;

  constructor(private fb: FormBuilder,
              private readoutDao: ReadoutDao,) {
    super();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.readoutsForm = this.fb.array([]);
    this.counts.forEach(count => {
      this.readoutsForm.push(this.fb.group({
        countId: [count.id],
        readout: ['', [Validators.maxLength(8)]], //fixme: wrong validation
      }));
    });
  }

  ngOnInit() {
  }

  save() {
    let readouts: Readout[] = this.readoutsForm.controls
      .map(readoutFormGroup => readoutFormGroup.value)
      .filter(readout => readout.readout || readout.readout === 0);

    this.readoutDao.create(readouts)
      .subscribe((space) => this.onSave.emit(space));
  }
}
