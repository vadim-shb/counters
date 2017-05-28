import {inject, TestBed} from '@angular/core/testing';
import {SecureHttpService} from './secure-http.service';
import {BaseRequestOptions, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('SecureHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: SecureHttpService,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => new SecureHttpService(backend, options)
        }
      ]
    });
  });

  it('should be created', inject([SecureHttpService], (service: SecureHttpService) => {
    expect(service).toBeTruthy();
  }));
});
