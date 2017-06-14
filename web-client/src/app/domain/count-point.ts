//todo: Count --> CountPoint
export class CountPoint {
  public id?: number;
  public spaceId?: number;
  public type: ResourceType;
  public name: string;
}

export class Readout {
  public id?: number;
  public countPointId: number;
  public readout: number;
  public creationDateTime?: Date;
}

export enum ResourceType {
  COLD_WATER = <any>'COLD_WATER',
  HOT_WATER = <any>'HOT_WATER',
  ELECTRICITY = <any>'ELECTRICITY',
  ELECTRICITY_DAY = <any>'ELECTRICITY_DAY',
  ELECTRICITY_NIGHT = <any>'ELECTRICITY_NIGHT',
  GAS = <any>'GAS',
}

export function resourceTypeByName(resourceType: string) {
  switch (resourceType) {
    case 'COLD_WATER': return ResourceType.COLD_WATER;
    case 'HOT_WATER': return ResourceType.HOT_WATER;
    case 'ELECTRICITY': return ResourceType.ELECTRICITY;
    case 'ELECTRICITY_DAY': return ResourceType.ELECTRICITY_DAY;
    case 'ELECTRICITY_NIGHT': return ResourceType.ELECTRICITY_NIGHT;
    case 'GAS': return ResourceType.GAS;
    default:
      throw 'wrong resource type';
  }
}
