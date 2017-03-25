import {TestBed, inject} from "@angular/core/testing";
import {SecurityService} from "./security.service";
import {PureHttpService} from "../pure-http/pure-http.service";
import {HttpModule, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {UserService} from "../user/user.service";
import {BehaviorSubject} from "rxjs";

describe('SecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SecurityService,
        ErrorHandleService,
        UserService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: PureHttpService,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => new PureHttpService(backend, options)
        }
      ]
    });
  });

  it('should be created', inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  }));

  it('should post credentials to backend', inject([SecurityService], (service: SecurityService) => {
    let httpMock = TestBed.get(PureHttpService);
    spyOn(httpMock, 'post').and.returnValue(new BehaviorSubject({status: 404}));

    service.signIn({username: 'unregistered-user', password: '123'});

    expect(httpMock.post).toHaveBeenCalledWith(`/api/security/sign-in`, {
      username: 'unregistered-user',
      password: '123'
    });
  }));

  it('should return Observable[undefined] if backend returns 404', inject([SecurityService], (service: SecurityService) => {
    let httpMock = TestBed.get(PureHttpService);
    spyOn(httpMock, 'post').and.returnValue(new BehaviorSubject({status: 404}));

    let result = service.signIn({username: 'unregistered-user', password: '123'});

    result.subscribe(user => expect(user).not.toBeDefined())
  }));

  it('should return Observable[User] if backend returns user', inject([SecurityService], (service: SecurityService) => {
    let httpMock = TestBed.get(PureHttpService);
    spyOn(httpMock, 'post').and.returnValue(new BehaviorSubject({
      status: 200, json: function() {
        return {
          accessToken: '777',
          user: {
            id: 7,
            name: 'Nick',
            surname: 'Fury',
            roles: ['ADMIN']
          }
        }
      }
    }));

    let result = service.signIn({username: 'nick', password: '123'});

    result.subscribe(user => expect(user).toEqual({
      id: 7,
      name: 'Nick',
      surname: 'Fury',
      roles: ['ADMIN']
    }))
  }));
});
