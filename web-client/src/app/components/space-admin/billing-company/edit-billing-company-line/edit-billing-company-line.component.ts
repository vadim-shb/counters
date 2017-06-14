import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillingCompanyDao} from '../../../../dao/billing-company/billing-company.dao';
import {BillingCompany} from '../../../../domain/billing-company';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import * as _ from 'underscore';
import {InternationalizedComponent} from '../../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'edit-billing-company-line',
  templateUrl: './edit-billing-company-line.component.html',
  styleUrls: ['./edit-billing-company-line.component.less']
})
export class EditBillingCompanyLineComponent extends InternationalizedComponent implements OnInit {

  private originalBillingCompany: BillingCompany;
  private billingCompanyForm: FormGroup;
  private towns: Town[] = [];
  private _ = _;

  private get nameFormControl() {
    return this.billingCompanyForm.get('name');
  }

  // @formatter:off
  constructor(
    private fb: FormBuilder,
    private billingCompanyDao: BillingCompanyDao,
    private townDao: TownDao,
  )
  // @formatter:on
  {
    super();
  }

  ngOnInit() {
    this.townDao.loadAll().subscribe(towns => this.towns = towns);
  }

  @Input() set billingCompany(billingCompanyToEdit: BillingCompany) {
    this.originalBillingCompany = billingCompanyToEdit;
    this.billingCompanyForm = this.fb.group({
      id: [billingCompanyToEdit.id],
      name: [billingCompanyToEdit.name, [Validators.required]],
      towns: [_.clone(billingCompanyToEdit.towns)],
    })
  };

  @Output() onSave = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  addOrRemoveTown(townId) {
    let towns = this.billingCompanyForm.value.towns;
    let townInCompany = towns.find(town => town.id == townId);
    if (townInCompany) {
      towns.splice(towns.indexOf(townInCompany), 1);
    } else {
      let town = this.towns.find(town => town.id == townId);
      towns.push(town);
    }
  }

  save() {
    if (this.billingCompanyForm.invalid) {
      this.nameFormControl.markAsTouched();
      return;
    }
    let billingCompany: BillingCompany = this.billingCompanyForm.value;

    let saveObs = billingCompany.id ? this.billingCompanyDao.update(billingCompany) : this.billingCompanyDao.create(billingCompany);
    saveObs.subscribe(billingCompany => {
      this.billingCompany = billingCompany;
      this.onSave.emit(billingCompany);
      setTimeout(() => this.markFormAsUntouchedAndPending());
    });
  }

  delete() {
    this.billingCompanyDao.delete(this.originalBillingCompany.id)
      .subscribe(() => {
        this.onDelete.emit();
      });
  }

  private markFormAsUntouchedAndPending() {
    this.billingCompanyForm.markAsUntouched();
    this.nameFormControl.markAsPending();
  }

}
