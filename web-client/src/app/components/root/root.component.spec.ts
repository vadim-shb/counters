import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RootComponent} from './root.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [RootComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RootComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
