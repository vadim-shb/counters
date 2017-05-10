import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageScreenComponent } from './message-screen.component';

describe('MessageScreenComponent', () => {
  let component: MessageScreenComponent;
  let fixture: ComponentFixture<MessageScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
