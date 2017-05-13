import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUsageComponent } from './terms-of-usage.component';

describe('TermsOfUsageComponent', () => {
  let component: TermsOfUsageComponent;
  let fixture: ComponentFixture<TermsOfUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
