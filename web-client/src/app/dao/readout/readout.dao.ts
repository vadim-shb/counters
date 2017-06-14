import {Injectable} from '@angular/core';
import {Readout} from '../../domain/count-point';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReadoutDao {

  constructor(private http: Http) {
  }

  create(readouts: Readout[]): Observable<Readout[]> {
    return this.http.post(`api/readouts`, readouts)
      .map(response => response.json() as Readout[]);
  }
}
