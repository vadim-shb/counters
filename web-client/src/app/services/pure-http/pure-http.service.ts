import {Injectable} from '@angular/core';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

@Injectable()
export class PureHttpService extends Http {

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

}
