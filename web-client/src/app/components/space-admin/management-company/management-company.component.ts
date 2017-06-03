import { Component, OnInit } from '@angular/core';
import {ManagementCompanyDao} from '../../../dao/management-company/management-company.dao';
import {ManagementCompany} from '../../../domain/management-company';

@Component({
  selector: 'app-management-company',
  templateUrl: './management-company.component.html',
  styleUrls: ['./management-company.component.less']
})
export class ManagementCompanyComponent implements OnInit {

  private newManagementCompany: ManagementCompany;
  private managementCompanies: ManagementCompany[] = [];

  // @formatter:off
  constructor(
    private managementCompanyDao: ManagementCompanyDao,
  ) { }
  // @formatter:on

  ngOnInit() {
    this.newManagementCompany = new ManagementCompany();
    this.managementCompanyDao.loadAll()
      .subscribe(managementCompanies => this.managementCompanies = managementCompanies);
  }

  clearSavedValue(savedManagementCompany) {
    this.newManagementCompany = new ManagementCompany();
  }

  deleted(deletedManagementCompany: ManagementCompany) {
    this.managementCompanies = this.managementCompanies.filter(managementCompany => managementCompany != deletedManagementCompany);
  }

}
