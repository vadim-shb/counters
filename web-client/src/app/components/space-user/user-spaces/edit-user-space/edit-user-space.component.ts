import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import {CountType, countTypeByName} from '../../../../domain/count';
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
  private spaceAddressForm: FormGroup;
  private towns: Town[];

  private get townIdFormControl() {
    return this.spaceAddressForm.get('townId');
  }

  private get addressFormControl() {
    return this.spaceAddressForm.get('address');
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
      counts: this.fb.array([
        this.fb.group({
          id: [],
          spaceId: [],
          type: [CountType.COLD_WATER, [Validators.required]],
          name: [this.i18n.entCount.COLD_WATER, [Validators.required, Validators.maxLength(1000)]],
        }),
        this.fb.group({
          id: [],
          spaceId: [],
          type: [CountType.HOT_WATER, [Validators.required]],
          name: [this.i18n.entCount.HOT_WATER, [Validators.required, Validators.maxLength(250)]],
        }),
      ]),
    });

    this.townDao.loadAll().subscribe(towns => this.towns = towns);
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

    this.spaceDao.create(this.spaceAddressForm.value)
      .subscribe();
  }

}
