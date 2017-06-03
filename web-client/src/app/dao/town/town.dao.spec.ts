import { TestBed, inject } from '@angular/core/testing';
import {TownDao} from './town.dao';


describe('TownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TownDao]
    });
  });

  it('should be created', inject([TownDao], (dao: TownDao) => {
    expect(dao).toBeTruthy();
  }));
});
