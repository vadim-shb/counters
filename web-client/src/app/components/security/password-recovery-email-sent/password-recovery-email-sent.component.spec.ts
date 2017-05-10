import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryEmailSentComponent } from './password-recovery-email-sent.component';

describe('PasswordRecoveryEmailSentComponent', () => {
  let component: PasswordRecoveryEmailSentComponent;
  let fixture: ComponentFixture<PasswordRecoveryEmailSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryEmailSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
