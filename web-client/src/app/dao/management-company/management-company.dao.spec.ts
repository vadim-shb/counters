import { TestBed, inject } from '@angular/core/testing';
import {ManagementCompanyDao} from './management-company.dao';


describe('ManagementCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagementCompanyDao]
    });
  });

  it('should be created', inject([ManagementCompanyDao], (service: ManagementCompanyDao) => {
    expect(service).toBeTruthy();
  }));
});
