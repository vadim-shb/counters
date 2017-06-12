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

  loadCurrentUserSpaces(): Observable<Space[]> {
    return this.userService.getUser()
      .flatMap(user => {
        return this.http.get(`/api/spaces?userId=${user.id}`)
          .map(response => response.json() as Space[]);
      });
  }

  loadOne(spaceId: number): Observable<Space> {
    return this.http.get(`/api/space/${spaceId}`)
          .map(response => response.json() as Space);
  }

  create(space: Space): Observable<Space> {
    return this.http.post(`/api/space`, space)
      .map(response => response.json() as Space);
  }

  update(space: Space): Observable<Space> {
    return this.http.put(`/api/space/${space.id}`, space)
      .map(response => response.json() as Space);
  }

}
