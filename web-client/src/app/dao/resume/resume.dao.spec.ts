import {inject, TestBed} from '@angular/core/testing';
import {ResumeDao} from './resume.dao';


describe('ResumeDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumeDao]
    });
  });

  it('should ...', inject([ResumeDao], (service: ResumeDao) => {
    expect(service).toBeTruthy();
  }));
});
