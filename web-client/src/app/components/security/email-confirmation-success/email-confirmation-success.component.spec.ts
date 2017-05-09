import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationSuccessComponent } from './email-confirmation-success.component';

describe('EmailConfirmationSuccessComponent', () => {
  let component: EmailConfirmationSuccessComponent;
  let fixture: ComponentFixture<EmailConfirmationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailConfirmationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
