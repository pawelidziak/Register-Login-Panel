import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RegisterCommand} from '../_models/RegisterCommand';
import {LoginCommand} from '../_models/LoginCommand';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  register(user: RegisterCommand): Observable<any> {
    return this.http.post('http://localhost:5000/user/register', user)
      .catch((error: any) => {
        if (error) {
          if (error.status === 409) {
            return Observable.throw(new Error('This email is occupied.'));
          }
        }
      });
  }

  login(user: LoginCommand): Observable<any> {
    return this.http.post('http://localhost:5000/user/login', user)
      .map((res: Response) => {
      console.log(res.json());
        const token = res.json().token;
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }
      })
      .catch((error: any) => {
        if (error) {
          if (error.status === 401) {
            return Observable.throw(new Error('Login failed. Invalid credentials.'));
          }
        }
      });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private jwt() {
    // tworzenie nagłówka dla jwt bearer
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
