import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingCompanyLineComponent } from './edit-billing-company-line.component';

describe('EditBillingCompanyLineComponent', () => {
  let component: EditBillingCompanyLineComponent;
  let fixture: ComponentFixture<EditBillingCompanyLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillingCompanyLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingCompanyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
