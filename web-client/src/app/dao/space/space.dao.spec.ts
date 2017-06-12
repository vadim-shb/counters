import {inject, TestBed} from '@angular/core/testing';
import {SpaceDao} from './space.dao';


describe('SpaceDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpaceDao]
    });
  });

  it('should be created', inject([SpaceDao], (service: SpaceDao) => {
    expect(service).toBeTruthy();
  }));
});
