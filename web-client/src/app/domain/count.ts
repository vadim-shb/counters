//todo: think about renaming. CountPoint?
export class Count {
  public id?: number;
  public spaceId?: number;
  public type: CountType;
  public name: string;
}

export class Readout {
  public id?: number;
  public countId: number;
  public readout: number;
  public creationDateTime?: Date;
}

// todo: ResourceType?
export enum CountType {
  COLD_WATER = <any>'COLD_WATER',
  HOT_WATER = <any>'HOT_WATER',
  ELECTRICITY = <any>'ELECTRICITY',
  ELECTRICITY_DAY = <any>'ELECTRICITY_DAY',
  ELECTRICITY_NIGHT = <any>'ELECTRICITY_NIGHT',
  GAS = <any>'GAS',
}

export function countTypeByName(countType: string) {
  switch (countType) {
    case 'COLD_WATER': return CountType.COLD_WATER;
    case 'HOT_WATER': return CountType.HOT_WATER;
    case 'ELECTRICITY': return CountType.ELECTRICITY;
    case 'ELECTRICITY_DAY': return CountType.ELECTRICITY_DAY;
    case 'ELECTRICITY_NIGHT': return CountType.ELECTRICITY_NIGHT;
    case 'GAS': return CountType.GAS;
    default:
      throw 'wrong count type';
  }
}
