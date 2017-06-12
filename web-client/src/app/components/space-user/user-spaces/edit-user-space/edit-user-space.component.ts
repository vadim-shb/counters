import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import {Count, CountType, countTypeByName} from '../../../../domain/count';
import {SpaceDao} from '../../../../dao/space-dao/space.dao';

@Component({
  selector: 'edit-user-space',
  templateUrl: './edit-user-space.component.html',
  styleUrls: ['./edit-user-space.component.less']
})
export class EditUserSpaceComponent implements OnInit {

  private i18n: Translation;
  private CountType = CountType;
  private countTypes: CountType[];

  @Input() spaceId: number;
  @Output() onSave = new EventEmitter();

  private spaceAddressForm: FormGroup;
  private towns: Town[];

  private get idFormControl(): FormControl {
    return this.spaceAddressForm.get('id') as FormControl;
  }

  private get townIdFormControl() {
    return this.spaceAddressForm.get('townId') as FormControl;
  }

  private get addressFormControl() {
    return this.spaceAddressForm.get('address') as FormControl;
  }

  private get countsFormControl(): FormArray {
    return this.spaceAddressForm.get('counts') as FormArray;
  };

  constructor(private i18nService: I18nService,
              private fb: FormBuilder,
              private townDao: TownDao,
              private spaceDao: SpaceDao,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

    this.countTypes = [];
    for (let countType in CountType) {
      this.countTypes.push(countTypeByName(countType));
    }
  }

  ngOnInit() {
    this.spaceAddressForm = this.fb.group({
      id: [],
      townId: [, Validators.required],
      address: ['', [Validators.required, Validators.maxLength(1000)]],
      counts: this.fb.array([]),
    });

    this.townDao.loadAll().subscribe(towns => this.towns = towns);

    if (this.spaceId) {
      this.spaceDao.loadOne(this.spaceId)
        .subscribe(space => {
          this.fillFormWithSpace(space);
          this.townIdFormControl.disable();
          this.addressFormControl.disable();
        });
    } else {
      this.addBasicCountsToNewForm();
    }
  }

  private addBasicCountsToNewForm() {
    this.countsFormControl.push(this.generateCountFormGroup({
      type: CountType.COLD_WATER,
      name: this.i18n.entCount.COLD_WATER
    }));
    this.countsFormControl.push(this.generateCountFormGroup({
      type: CountType.HOT_WATER,
      name: this.i18n.entCount.HOT_WATER
    }));
  }

  private fillFormWithSpace(space) {
    this.idFormControl.setValue(space.id);
    this.townIdFormControl.setValue(space.townId);
    this.addressFormControl.setValue(space.address);
    space.counts.forEach(count => {
      let countFormGroup = this.generateCountFormGroup(count);
      countFormGroup.get('type').disable();
      this.countsFormControl.push(countFormGroup);
    });
  }

  private generateCountFormGroup(count: Count): FormGroup {
    return this.fb.group({
      id: [count.id],
      spaceId: [count.spaceId],
      type: [count.type, [Validators.required]],
      name: [count.name, [Validators.required, Validators.maxLength(1000)]],
    });
  }

  save() {
    if (this.spaceAddressForm.invalid) {
      this.townIdFormControl.markAsTouched();
      this.addressFormControl.markAsTouched();
      this.countsFormControl.controls.forEach(countFormGroup => {
        countFormGroup.get('type').markAsTouched();
        countFormGroup.get('name').markAsTouched();
      });
      return;
    }

    (this.spaceId ?
        this.spaceDao.update(this.spaceAddressForm.value) :
        this.spaceDao.create(this.spaceAddressForm.value)
    )
      .subscribe((space) => this.onSave.emit(space));
  }

}
