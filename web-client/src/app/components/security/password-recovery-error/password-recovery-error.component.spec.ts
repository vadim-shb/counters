import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryErrorComponent } from './password-recovery-error.component';

describe('PasswordRecoveryErrorComponent', () => {
  let component: PasswordRecoveryErrorComponent;
  let fixture: ComponentFixture<PasswordRecoveryErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
