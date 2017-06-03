import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Town} from '../../../../domain/town';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {TownDao} from '../../../../dao/town/town.dao';

@Component({
  selector: 'edit-town-line',
  templateUrl: './edit-town-line.component.html',
  styleUrls: ['./edit-town-line.component.less']
})
export class EditTownLineComponent implements OnInit {

  private originalTown: Town;
  private townForm: FormGroup;
  private i18n: Translation;


  private get nameFormControl() {
    return this.townForm.get('name');
  }

  // @formatter:off
  constructor(
    private fb: FormBuilder,
    private i18nService: I18nService,
    private townDao: TownDao,
  )
  // @formatter:on
  {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
  }

  @Input() set town(townToEdit: Town) {
    this.originalTown = townToEdit;
    this.townForm = this.fb.group({
      id: [townToEdit.id],
      name: [townToEdit.name, [Validators.required]]
    })
  };

  @Output() onSave = new EventEmitter();

  save() {
    if (this.townForm.invalid) {
      this.nameFormControl.markAsTouched();
      return;
    }
    let town: Town = this.townForm.value;

    let saveObs = town.id ? this.townDao.update(town) : this.townDao.create(town);
    saveObs.subscribe((town) => {
      this.town = town;
      this.onSave.emit(town);
      setTimeout(() => this.markFormAsUntouchedAndPending());
    });
  }

  private markFormAsUntouchedAndPending() {
    this.townForm.markAsUntouched();
    this.nameFormControl.markAsPending();
  }
}
