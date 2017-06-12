import { TestBed, inject } from '@angular/core/testing';
import {ReadoutDao} from './readout.dao';


describe('ReadoutDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadoutDao]
    });
  });

  it('should be created', inject([ReadoutDao], (service: ReadoutDao) => {
    expect(service).toBeTruthy();
  }));
});
