import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ManagementCompany} from '../../domain/management-company';

@Injectable()
export class ManagementCompanyDao {

  constructor(private http: Http) {
  }

  loadAll(): Observable<ManagementCompany[]> {
    return this.http.get(`api/management-companies`)
      .map(response => response.json() as ManagementCompany[]);
  }

  create(managementCompany: ManagementCompany): Observable<ManagementCompany> {
    return this.http.post(`api/management-company/`, managementCompany)
      .map(response => response.json() as ManagementCompany);
  }

  update(managementCompany: ManagementCompany): Observable<ManagementCompany> {
    return this.http.put(`api/management-company/${managementCompany.id}`, managementCompany)
      .map(response => response.json() as ManagementCompany);
  }

  delete(managementCompanyId: number) {
    return this.http.delete(`api/management-company/${managementCompanyId}`);
  }

}
