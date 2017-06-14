import {Component, OnInit} from '@angular/core';
import {BillingCompanyDao} from '../../../dao/billing-company/billing-company.dao';
import {BillingCompany} from '../../../domain/billing-company';

@Component({
  selector: 'app-billing-company',
  templateUrl: './billing-company.component.html',
  styleUrls: ['./billing-company.component.less']
})
export class BillingCompanyComponent implements OnInit {

  private newBillingCompany: BillingCompany;
  private billingCompanies: BillingCompany[] = [];

  // @formatter:off
  constructor(
    private billingCompanyDao: BillingCompanyDao,
  ) { }
  // @formatter:on

  ngOnInit() {
    this.newBillingCompany = new BillingCompany();
    this.billingCompanyDao.loadAll()
      .subscribe(billingCompanies => this.billingCompanies = billingCompanies);
  }

  clearSavedValue(savedBillingCompany) {
    this.newBillingCompany = new BillingCompany();
  }

  deleted(deletedBillingCompany: BillingCompany) {
    this.billingCompanies = this.billingCompanies.filter(billingCompany => billingCompany != deletedBillingCompany);
  }

}
