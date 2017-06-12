import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadoutsComponent } from './add-readouts.component';

describe('AddReadoutsComponent', () => {
  let component: AddReadoutsComponent;
  let fixture: ComponentFixture<AddReadoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReadoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReadoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
