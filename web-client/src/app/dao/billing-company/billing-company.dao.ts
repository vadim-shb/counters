import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BillingCompany} from '../../domain/billing-company';

@Injectable()
export class BillingCompanyDao {

  constructor(private http: Http) {
  }

  loadAll(): Observable<BillingCompany[]> {
    return this.http.get(`api/billing-companies`)
      .map(response => response.json().map(buildingCompany => new BillingCompany(buildingCompany)));
  }

  create(billingCompany: BillingCompany): Observable<BillingCompany> {
    return this.http.post(`api/billing-company/`, billingCompany)
      .map(response => new BillingCompany(response.json()));
  }

  update(billingCompany: BillingCompany): Observable<BillingCompany> {
    return this.http.put(`api/billing-company/${billingCompany.id}`, billingCompany)
      .map(response => new BillingCompany(response.json()));
  }

  delete(billingCompanyId: number) {
    return this.http.delete(`api/billing-company/${billingCompanyId}`);
  }

}
