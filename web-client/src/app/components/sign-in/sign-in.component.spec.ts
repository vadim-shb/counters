import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SignInComponent} from "./sign-in.component";
import {MaterialModule} from "@angular/material";
import {SecurityService} from "../../services/security/security.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule
      ],
      providers: [
        {provide: SecurityService, useValue: {}},
        {provide: Router, useValue: { navigate: jasmine.createSpy('navigate')}}
      ],
      declarations: [SignInComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be created', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should invoke sign in service', () => {
    // GIVEN
    let securityServiceMock = TestBed.get(SecurityService);
    securityServiceMock.signIn = jasmine.createSpy('signIn').and.returnValue(new BehaviorSubject(undefined));

    component.username = 'nick';
    component.password = '123';

    // WHEN
    component.signIn();

    // THEN
    expect(securityServiceMock.signIn).toHaveBeenCalledWith('nick','123');
  });

  it('should redirect if successful sign in', () => {
    // GIVEN
    TestBed.get(SecurityService).signIn = jasmine.createSpy('signIn').and.returnValue(new BehaviorSubject({
      user: {
        id: 3,
        name: 'Nick Fury',
        roles: ['ADMIN', 'MAIN_HR']
      }
    }));

    // WHEN
    component.signIn();

    // THEN
    expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/vacancies']);
  });

  it('should not redirect if fail to sign in', () => {
    // GIVEN
    TestBed.get(SecurityService).signIn = jasmine.createSpy('signIn').and.returnValue(new BehaviorSubject(undefined));

    // WHEN
    component.signIn();

    // THEN
    expect(TestBed.get(Router).navigate).not.toHaveBeenCalled();
  });
});
