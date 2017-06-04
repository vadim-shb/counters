import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '../../../../modules/i18n/i18n.service';
import {Translation} from '../../../../modules/i18n/translations/translation';
import {TownDao} from '../../../../dao/town/town.dao';
import {Town} from '../../../../domain/town';
import {ManagementCompanyDao} from '../../../../dao/management-company/management-company.dao';
import {ManagementCompany} from '../../../../domain/management-company';

@Component({
  selector: 'app-edit-user-space',
  templateUrl: './edit-user-space.component.html',
  styleUrls: ['./edit-user-space.component.less']
})
export class EditUserSpaceComponent implements OnInit {

  private spaceAddressForm: FormGroup;
  private i18n: Translation;
  private towns: Town[];
  private managementCompanies: ManagementCompany[];
  private managementCompaniesInTown: ManagementCompany[];

  private get addressFormControl() {
    return this.spaceAddressForm.get('address');
  }

  constructor(private i18nService: I18nService,
              private fb: FormBuilder,
              private townDao: TownDao,
              private managementCompanyDao: ManagementCompanyDao,
  ) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });

  }

  ngOnInit() {
    this.spaceAddressForm = this.fb.group({
      townId: [, Validators.required],
      address: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.townDao.loadAll().subscribe(towns => this.towns = towns);
    this.managementCompanyDao.loadAll().subscribe(managementCompanies => this.managementCompanies = managementCompanies);
  }

  townChanges(townId: number) {
    this.managementCompaniesInTown = this.managementCompanies.filter(mc => mc.towns.filter(town => town.id == townId).length > 0);
  }

}
