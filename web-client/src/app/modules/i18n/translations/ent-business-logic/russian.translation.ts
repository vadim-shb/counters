import {EntityCountTranslation, EntityManagementCompanyTranslation, EntitySpaceAddressTranslation, EntityTownTranslation} from './translation';

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
  ADDRESS__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS = 'Адрес не может быть длинее 1000 символов';
  TOWN__REQUIRED = 'Город не может быть пустым';
}

export class EntityCountRussianTranslation implements EntityCountTranslation {
  NAME = 'Название';
  TYPE = 'Тип';
  COLD_WATER = 'Холодная вода';
  HOT_WATER = 'Горячая вода';
  ELECTRICITY = 'Электричество';
  ELECTRICITY_DAY = 'Электричество-день';
  ELECTRICITY_NIGHT = 'Электричество-ночь';
  GAS = 'Газ';

  // ==== errors ====
  NAME__REQUIRED = 'Название не может быть пустым';
  NAME__CAN_NOT_BE_LONGER_THAN_250_CHARACTERS = 'Название не может быть длинее 250 символов';
}
