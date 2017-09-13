import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RegisterCommand} from '../_models/RegisterCommand';
import {LoginCommand} from '../_models/LoginCommand';
import {AuthService} from './auth.service';
import {IUser} from '../_models/IUser';
import {UpdateCommand} from '../_models/UpdateCommand';

@Injectable()
export class UserService {

  constructor(private http: Http, private _authService: AuthService) {
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
        const token = res.json().token;
        if (token) {
          this._authService.setJwtToken(token);
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

  getMe(): Observable<IUser> {
    return this.http.get('http://localhost:5000/user', this._authService.createJwtHeader())
      .map((res: Response) => res.json())
      .catch((error: any) => {
        if (error) {
          if (error.status === 401) {
            return Observable.throw(new Error('Unauthorized.'));
          }
          return Observable.throw(new Error());
        }
      });
  }

  update(userId: string, command: UpdateCommand): Observable<any> {
    return this.http.put('http://localhost:5000/user/' + userId, command, this._authService.createJwtHeader())
      .catch((error: any) => {
        if (error) {
          if (error) {
            if (error.status === 401) {
              return Observable.throw(new Error('Unauthorized.'));
            }
            if (error.status === 409) {
              return Observable.throw(new Error('Sorry, that email\'s taken. Try another.'));
            }
            if (error.status === 400) {
              return Observable.throw(new Error(error.json().message));
            }
            return Observable.throw(new Error(error.json().message));
          }
        }
      });
  }

  logout(): void {
    this._authService.clearJwtToken();
  }

}
