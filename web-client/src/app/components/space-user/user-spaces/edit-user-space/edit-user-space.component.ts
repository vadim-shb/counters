import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import {Count, ResourceType, resourceTypeByName} from '../../../../domain/count';
import {SpaceDao} from '../../../../dao/space/space.dao';
import {EditMode} from 'app/domain/edit-mode';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'edit-user-space',
  templateUrl: './edit-user-space.component.html',
  styleUrls: ['./edit-user-space.component.less']
})
export class EditUserSpaceComponent extends InternationalizedComponent implements OnInit {

  private ResourceType = ResourceType;
  private resourceTypes: ResourceType[];

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

  constructor(private fb: FormBuilder,
              private townDao: TownDao,
              private spaceDao: SpaceDao,) {
    super();

    this.resourceTypes = [];
    for (let resourceType in ResourceType) {
      this.resourceTypes.push(resourceTypeByName(resourceType));
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
    this.addCountWithType(ResourceType.COLD_WATER);
    this.addCountWithType(ResourceType.HOT_WATER);
  }

  private fillFormWithSpace(space) {
    this.idFormControl.setValue(space.id);
    this.townIdFormControl.setValue(space.townId);
    this.addressFormControl.setValue(space.address);
    space.counts.forEach(count => {
      this.addCount(count, EditMode.CUT);
    });
  }

  private addCount(count: Count, editMode: EditMode): void {
    let countFormGroup = this.fb.group({
      id: [count.id],
      spaceId: [count.spaceId],
      type: [count.type, [Validators.required]],
      name: [count.name, [Validators.required, Validators.maxLength(1000)]],
    });
    if (editMode === EditMode.CUT) {
      countFormGroup.get('type').disable();
    }
    this.countsFormControl.push(countFormGroup);
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

  addCountWithType(resourceType: ResourceType) {
    this.addCount({
      type: resourceType,
      name: this.i18n.entCount[resourceType]
    }, EditMode.FULL)
  }
}
