import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../_models/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  register(user: User): Observable<any> {
    return this.http.post('http://localhost:5000/user/register', user)
      .catch((error: any) => {
        if (error) {
          return Observable.throw(new Error('This email is occupied.'));
        }
      });
  }

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
