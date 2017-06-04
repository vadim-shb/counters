import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSpaceComponent } from './edit-user-space.component';

describe('EditUserSpaceComponent', () => {
  let component: EditUserSpaceComponent;
  let fixture: ComponentFixture<EditUserSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
