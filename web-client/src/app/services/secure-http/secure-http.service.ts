import {Injectable} from "@angular/core";
import {Http, ConnectionBackend, RequestOptions} from "@angular/http";

@Injectable()
export class SecureHttpService extends Http {

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,) {
    super(backend, defaultOptions);
  }

}
