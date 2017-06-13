import {Town} from './town';
//todo: think about renaming. ResourceRegistrar? Company?
export class ManagementCompany {
  id?: number;
  name: string;
  towns: Town[];
}
