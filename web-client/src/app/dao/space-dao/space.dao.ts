import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Space} from '../../domain/space';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services/user/user.service';

@Injectable()
export class SpaceDao {

  constructor(private http: Http,
              private userService: UserService,) {
  }

  create(space: Space): Observable<Space> {
    return this.http.post(`/api/space`, space)
      .map(response => response.json() as Space);
  }

  findCurrentUserSpaces(): Observable<Space[]> {
    return this.userService.getUser()
      .flatMap(user => {
        return this.http.get(`/api/spaces?userId=${user.id}`)
          .map(response => response.json() as Space[]);
      });
  }
}
