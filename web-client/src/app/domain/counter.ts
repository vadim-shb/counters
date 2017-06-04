export class Counter {
  public id?: number;
  public spaceId: number;
  public type: CounterType;
  public readout: Readout[];
}

export class Readout {
  public id?: number;
  public readout: number;
  public dateTime: Date;
}

export enum CounterType {
  WATER_COLD, WATER_HOT, ELECTRICITY_DAY, ELECTRICITY_NIGHT, ELECTRICITY, GAS
}
