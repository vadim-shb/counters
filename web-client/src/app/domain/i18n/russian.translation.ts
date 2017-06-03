import {EntityTownTranslation} from './translation';

export class EntityTownRussianTranslation implements EntityTownTranslation {
  TOWNS = 'Города';
  TOWN = 'Город';
  NAME = 'Название';

  // ==== errors ====
  NAME__REQUIRED = 'Название не может быть пустым';
}
