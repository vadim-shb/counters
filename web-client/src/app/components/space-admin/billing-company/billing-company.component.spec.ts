import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCompanyComponent } from './billing-company.component';

describe('BillingCompanyComponent', () => {
  let component: BillingCompanyComponent;
  let fixture: ComponentFixture<BillingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
