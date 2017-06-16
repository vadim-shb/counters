import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import {CountPoint, ResourceType, resourceTypeByName} from '../../../../domain/count-point';
import {SpaceDao} from '../../../../dao/space/space.dao';
import {EditMode} from 'app/domain/edit-mode';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';
import {Observable} from 'rxjs/Observable';

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
  private towns$: Observable<Town[]> = this.townDao.loadAll();

  private get idFormControl(): FormControl {
    return this.spaceAddressForm.get('id') as FormControl;
  }

  private get townIdFormControl() {
    return this.spaceAddressForm.get('townId') as FormControl;
  }

  private get addressFormControl() {
    return this.spaceAddressForm.get('address') as FormControl;
  }

  private get countPointsFormControl(): FormArray {
    return this.spaceAddressForm.get('countPoints') as FormArray;
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
      countPoints: this.fb.array([]),
    });

    if (this.spaceId) {
      this.spaceDao.loadOne(this.spaceId)
        .subscribe(space => {
          this.fillFormWithSpace(space);
          this.townIdFormControl.disable();
          this.addressFormControl.disable();
        });
    } else {
      this.addBasicCountPointsToNewForm();
    }
  }

  private addBasicCountPointsToNewForm() {
    this.addCountPointWithType(ResourceType.COLD_WATER);
    this.addCountPointWithType(ResourceType.HOT_WATER);
  }

  private fillFormWithSpace(space) {
    this.idFormControl.setValue(space.id);
    this.townIdFormControl.setValue(space.townId);
    this.addressFormControl.setValue(space.address);
    space.countPoints.forEach(countPoint => {
      this.addCountPoint(countPoint, EditMode.CUT);
    });
  }

  private addCountPoint(countPoint: CountPoint, editMode: EditMode): void {
    let countPointFormGroup = this.fb.group({
      id: [countPoint.id],
      spaceId: [countPoint.spaceId],
      type: [countPoint.type, [Validators.required]],
      name: [countPoint.name, [Validators.required, Validators.maxLength(1000)]],
    });
    if (editMode === EditMode.CUT) {
      countPointFormGroup.get('type').disable();
    }
    this.countPointsFormControl.push(countPointFormGroup);
  }

  save() {
    if (this.spaceAddressForm.invalid) {
      this.townIdFormControl.markAsTouched();
      this.addressFormControl.markAsTouched();
      this.countPointsFormControl.controls.forEach(countPointFormGroup => {
        countPointFormGroup.get('type').markAsTouched();
        countPointFormGroup.get('name').markAsTouched();
      });
      return;
    }

    (this.spaceId ?
        this.spaceDao.update(this.spaceAddressForm.value) :
        this.spaceDao.create(this.spaceAddressForm.value)
    )
      .subscribe((space) => this.onSave.emit(space));
  }

  addCountPointWithType(resourceType: ResourceType) {
    this.addCountPoint({
      type: resourceType,
      name: this.i18n.entCountPoint[resourceType]
    }, EditMode.FULL)
  }
}
