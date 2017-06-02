import {ManagementCompany} from './management-company';
export class Town {

  public id?: number;
  public name: string;
  public managementCompanies: ManagementCompany[];

  constructor () {
    this.name = '';
    this.managementCompanies = [];
  }
}
