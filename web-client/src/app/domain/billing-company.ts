import {Town} from './town';

export class BillingCompany {
  id?: number;
  name: string;
  towns: Town[];

  constructor(source?: BillingCompany){
    if (source) {
      this.id = source.id;
      this.name = source.name;
      this.towns = source.towns.map(town => new Town(town));
    } else {
      this.towns = [];
    }
  }

  isInTown(townId: number) {
    return this.towns.some(town => town.id === townId);
  }
}
