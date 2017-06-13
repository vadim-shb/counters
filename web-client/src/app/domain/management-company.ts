import {Town} from './town';
//todo: think about renaming. ResourceRegisterer? Company?
export class ManagementCompany {
  id?: number;
  name: string;
  towns: Town[];
}
