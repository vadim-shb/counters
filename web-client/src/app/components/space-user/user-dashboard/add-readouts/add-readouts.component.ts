import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Count, Readout} from '../../../../domain/count';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {ReadoutDao} from '../../../../dao/readout/readout.dao';

@Component({
  selector: 'add-readouts',
  templateUrl: './add-readouts.component.html',
  styleUrls: ['./add-readouts.component.less']
})
export class AddReadoutsComponent implements OnInit, OnChanges {

  private i18n: Translation;

  @Input() counts: Count[];
  @Output() onSave = new EventEmitter();

  private readoutsForm: FormArray;

  // todo: push i18n to parent class
  constructor(private i18nService: I18nService,
              private fb: FormBuilder,
              private readoutDao: ReadoutDao,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
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
