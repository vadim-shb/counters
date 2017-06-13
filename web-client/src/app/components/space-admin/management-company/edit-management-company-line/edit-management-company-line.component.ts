import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagementCompanyDao} from '../../../../dao/management-company/management-company.dao';
import {ManagementCompany} from '../../../../domain/management-company';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import * as _ from 'underscore';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'edit-management-company-line',
  templateUrl: './edit-management-company-line.component.html',
  styleUrls: ['./edit-management-company-line.component.less']
})
export class EditManagementCompanyLineComponent extends InternationalizedComponent implements OnInit {

  private originalManagementCompany: ManagementCompany;
  private managementCompanyForm: FormGroup;
  private towns: Town[] = [];
  private _ = _;

  private get nameFormControl() {
    return this.managementCompanyForm.get('name');
  }

  // @formatter:off
  constructor(
    private fb: FormBuilder,
    private managementCompanyDao: ManagementCompanyDao,
    private townDao: TownDao,
  )
  // @formatter:on
  {
    super();
  }

  ngOnInit() {
    this.townDao.loadAll().subscribe(towns => this.towns = towns);
  }

  @Input() set managementCompany(managementCompanyToEdit: ManagementCompany) {
    this.originalManagementCompany = managementCompanyToEdit;
    this.managementCompanyForm = this.fb.group({
      id: [managementCompanyToEdit.id],
      name: [managementCompanyToEdit.name, [Validators.required]],
      towns: [_.clone(managementCompanyToEdit.towns)],
    })
  };

  @Output() onSave = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  addOrRemoveTown(townId) {
    let towns = this.managementCompanyForm.value.towns;
    let townInCompany = towns.find(town => town.id == townId);
    if (townInCompany) {
      towns.splice(towns.indexOf(townInCompany), 1);
    } else {
      let town = this.towns.find(town => town.id == townId);
      towns.push(town);
    }
  }

  save() {
    if (this.managementCompanyForm.invalid) {
      this.nameFormControl.markAsTouched();
      return;
    }
    let managementCompany: ManagementCompany = this.managementCompanyForm.value;

    let saveObs = managementCompany.id ? this.managementCompanyDao.update(managementCompany) : this.managementCompanyDao.create(managementCompany);
    saveObs.subscribe(managementCompany => {
      this.managementCompany = managementCompany;
      this.onSave.emit(managementCompany);
      setTimeout(() => this.markFormAsUntouchedAndPending());
    });
  }

  delete() {
    this.managementCompanyDao.delete(this.originalManagementCompany.id)
      .subscribe(() => {
        this.onDelete.emit();
      });
  }

  private markFormAsUntouchedAndPending() {
    this.managementCompanyForm.markAsUntouched();
    this.nameFormControl.markAsPending();
  }

}
