import {EntityManagementCompanyTranslation, EntityTownTranslation} from './translation';

export class EntityTownRussianTranslation implements EntityTownTranslation {
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
