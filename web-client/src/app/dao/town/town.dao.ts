import {Injectable} from '@angular/core';
import {Town} from '../../domain/town';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class TownDao {

  constructor(private http: Http) {
  }

  create(town: Town): Observable<Town> {
    return this.http.post(`api/town/`, town)
      .map(response => response.json() as Town);
  }

  update(town: Town): Observable<Town> {
    return this.http.put(`api/town/${town.id}`, town)
      .map(response => response.json() as Town);
  }
}
