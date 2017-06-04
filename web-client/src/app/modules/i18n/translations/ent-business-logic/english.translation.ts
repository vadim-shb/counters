import {EntityManagementCompanyTranslation, EntitySpaceAddressTranslation, EntityTownTranslation} from './translation';

export class EntityTownEnglishTranslation implements EntityTownTranslation {
  TOWN = 'Town';
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

export class EntitySpaceAddressEnglishTranslation implements EntitySpaceAddressTranslation {
  ADDRESS = 'Address';

  // ==== errors ====
  ADDRESS__REQUIRED = 'Address required';
}
