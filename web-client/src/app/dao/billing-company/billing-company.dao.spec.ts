import { TestBed, inject } from '@angular/core/testing';
import {BillingCompanyDao} from './billing-company.dao';


describe('BillingCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingCompanyDao]
    });
  });

  it('should be created', inject([BillingCompanyDao], (service: BillingCompanyDao) => {
    expect(service).toBeTruthy();
  }));
});
