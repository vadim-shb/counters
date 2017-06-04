import {EntityManagementCompanyTranslation, EntitySpaceAddressTranslation, EntityTownTranslation} from './translation';

export class EntityTownRussianTranslation implements EntityTownTranslation {
  TOWN = 'Город';
  TOWNS = 'Города';
  ADD_TOWN = 'Добавить город';
  NAME = 'Название';

  // ==== errors ====
  NAME__REQUIRED = 'Название не может быть пустым';
}

export class EntityManagementCompanyRussianTranslation implements EntityManagementCompanyTranslation {
  MANAGEMENT_COMPANIES = 'Управляющие компании';
  ADD_MANAGEMENT_COMPANY = 'Добавить УК';
  NAME = 'Наименование';

  // ==== errors ====
  NAME__REQUIRED = 'Наименование не может быть пустым';
}

export class EntitySpaceAddressRussianTranslation implements EntitySpaceAddressTranslation {
  ADDRESS = 'Адрес';

  // ==== errors ====
  ADDRESS__REQUIRED = 'Адрес не может быть пустым';
}
