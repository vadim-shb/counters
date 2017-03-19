import { TestBed, inject } from '@angular/core/testing';

import { SecurityService } from './security.service';
import {PureHttpService} from "../pure-http/pure-http.service";
import {HttpModule, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('SecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SecurityService,
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
