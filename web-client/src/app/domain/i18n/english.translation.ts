import {EntityManagementCompanyTranslation, EntityTownTranslation} from './translation';

export class EntityTownEnglishTranslation implements EntityTownTranslation {

  TOWNS = 'Towns';
  ADD_TOWN = 'Add town';
  NAME = 'Name';

  // ==== errors ====
  NAME__REQUIRED = 'Name required';
}

export class EntityManagementCompanyEnglishTranslation implements EntityManagementCompanyTranslation {
  MANAGEMENT_COMPANIES = 'Management companies';
  ADD_MANAGEMENT_COMPANY = 'Add management company';
  NAME = 'Name';

  // ==== errors ====
  NAME__REQUIRED = 'Name required';
}
