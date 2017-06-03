import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompanyComponent } from './management-company.component';

describe('ManagementCompanyComponent', () => {
  let component: ManagementCompanyComponent;
  let fixture: ComponentFixture<ManagementCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
