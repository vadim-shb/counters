import {EntityCountTranslation, EntityManagementCompanyTranslation, EntitySpaceTranslation, EntityTownTranslation} from './translation';

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

export class EntitySpaceEnglishTranslation implements EntitySpaceTranslation {
  ADDRESS = 'Address';

  // ==== errors ====
  ADDRESS__REQUIRED = 'Address required';
  ADDRESS__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS = 'Address can not be longer than 1000 characters';
  TOWN__REQUIRED = 'Town required';
}

export class EntityCountEnglishTranslation implements EntityCountTranslation {
  NAME = 'Name';
  TYPE = 'Type';
  COLD_WATER = 'Cold water';
  HOT_WATER = 'Hot water';
  ELECTRICITY = 'Electricity';
  ELECTRICITY_DAY = 'Electricity-day';
  ELECTRICITY_NIGHT = 'Electricity-night';
  GAS = 'Gas';

  // ==== errors ====
  NAME__REQUIRED = 'Name required';
  NAME__CAN_NOT_BE_LONGER_THAN_250_CHARACTERS = 'Name can not be longer than 250 characters';
}
