import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SignInComponent} from "./sign-in.component";
import {MaterialModule} from "@angular/material";
import {SecurityService} from "../../services/security/security.service";
import {BehaviorSubject} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let securityServiceMock = {
    signIn: function(username: string, password: string){
      return new BehaviorSubject({
        user: {
          id: 3,
          name: 'Nick Fury',
          roles: ['ADMIN', 'MAIN_HR']
        }
      });
    }
  };

  beforeEach(async(() => {
    spyOn(securityServiceMock, 'signIn');

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule
      ],
      providers: [{ provide: SecurityService, useValue: securityServiceMock}],
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
    expect(component).toBeTruthy();
  });

  it('should invoke sign in service', () => {
    component.username = 'nick';
    component.password = '123';
    component.signIn();
    expect(securityServiceMock.signIn).toHaveBeenCalledWith('nick','123');
  });
});
