import {Count} from './count';
export class Space {

  public id?: number;
  public userId?: number;
  public townId: number;
  public address: string;
  public fullAddress?: string;
  public counts: Count[];

}
