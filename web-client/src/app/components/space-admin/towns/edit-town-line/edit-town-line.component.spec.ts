import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTownLineComponent } from './edit-town-line.component';

describe('EditTownLineComponent', () => {
  let component: EditTownLineComponent;
  let fixture: ComponentFixture<EditTownLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTownLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTownLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
