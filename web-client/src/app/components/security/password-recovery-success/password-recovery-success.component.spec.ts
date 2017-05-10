import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoverySuccessComponent } from './password-recovery-success.component';

describe('PasswordRecoverySuccessComponent', () => {
  let component: PasswordRecoverySuccessComponent;
  let fixture: ComponentFixture<PasswordRecoverySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRecoverySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoverySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
