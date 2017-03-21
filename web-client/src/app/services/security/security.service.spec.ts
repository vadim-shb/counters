import { TestBed, inject } from '@angular/core/testing';

import { SecurityService } from './security.service';
import {PureHttpService} from "../pure-http/pure-http.service";
import {HttpModule, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {ErrorHandleService} from "../error-handle/error-handle.service";
import {UserService} from "../user/user.service";

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
});
