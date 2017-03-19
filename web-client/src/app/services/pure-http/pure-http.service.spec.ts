import {TestBed, inject} from "@angular/core/testing";
import {PureHttpService} from "./pure-http.service";
import {HttpModule, Http, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('PureHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
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

  it('should be created', inject([PureHttpService], (service: PureHttpService) => {
    expect(service).toBeTruthy();
  }));
});
