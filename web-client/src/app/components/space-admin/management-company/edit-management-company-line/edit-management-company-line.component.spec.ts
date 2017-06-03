import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManagementCompanyLineComponent } from './edit-management-company-line.component';

describe('EditManagementCompanyLineComponent', () => {
  let component: EditManagementCompanyLineComponent;
  let fixture: ComponentFixture<EditManagementCompanyLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManagementCompanyLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManagementCompanyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
