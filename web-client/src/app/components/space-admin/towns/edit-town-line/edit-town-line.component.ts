import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Town} from '../../../../domain/town';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TownDao} from '../../../../dao/town/town.dao';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'edit-town-line',
  templateUrl: './edit-town-line.component.html',
  styleUrls: ['./edit-town-line.component.less']
})
export class EditTownLineComponent extends InternationalizedComponent implements OnInit {

  private originalTown: Town;
  private townForm: FormGroup;

  private get nameFormControl() {
    return this.townForm.get('name');
  }

  // @formatter:off
  constructor(
    private fb: FormBuilder,
    private townDao: TownDao,
  )
  // @formatter:on
  {
    super();
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
  @Output() onDelete = new EventEmitter();

  save() {
    if (this.townForm.invalid) {
      this.nameFormControl.markAsTouched();
      return;
    }
    let town: Town = this.townForm.value;

    let saveObs = town.id ? this.townDao.update(town) : this.townDao.create(town);
    saveObs.subscribe(town => {
      this.town = town;
      this.onSave.emit(town);
      setTimeout(() => this.markFormAsUntouchedAndPending());
    });
  }

  delete() {
    this.townDao.delete(this.originalTown.id)
      .subscribe(() => {
        this.onDelete.emit();
      });
  }

  private markFormAsUntouchedAndPending() {
    this.townForm.markAsUntouched();
    this.nameFormControl.markAsPending();
  }
}
