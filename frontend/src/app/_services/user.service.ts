import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {IRegisterCommand} from '../_models/IRegisterCommand';
import {ILoginCommand} from '../_models/ILoginCommand';
import {AuthService} from './auth.service';
import {IUser} from '../_models/IUser';
import {IUpdatePersonalCommand} from '../_models/IUpdatePersonalCommand';
import {IUpdatePasswordCommand} from '../_models/IUpdatePasswordCommand';
import {IActivateUser} from '../_models/IActivateUser';

@Injectable()
export class UserService {

  constructor(private http: Http, private _authService: AuthService) {
  }

  register(user: IRegisterCommand): Observable<any> {
    return this.http.post('http://localhost:5000/user/register', user)
      .catch((error: any) => {
        if (error) {
          if (error.status === 409) {
            return Observable.throw(new Error('This email is occupied.'));
          }
          return Observable.throw(new Error(error.json().message));
        }
      });
  }

  login(user: ILoginCommand): Observable<any> {
    return this.http.post('http://localhost:5000/user/login', user)
      .map((res: Response) => {
        const token = res.json().token;
        if (token) {
          this._authService.setJwtToken(token);
        }
      })
      .catch((error: any) => {
        if (error) {
          console.log(error);
          if (error.status === 401) {
            console.log(error.json().error);
            if (error.json().error === 'LoginFailed') {
              return Observable.throw(new Error('Login failed. Invalid credentials.'));
            }
            if (error.json().error === 'InActiveUser') {
              return Observable.throw(new Error('User is inactive. Please confirm your account.'));
            }
          }
          return Observable.throw(new Error(error.json().message));
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

  updatePersonal(userId: string, command: IUpdatePersonalCommand): Observable<any> {
    return this.http.put('http://localhost:5000/user/update/' + userId, command, this._authService.createJwtHeader())
      .catch((error: any) => {
        if (error) {
            if (error.status === 400) {
              if (error.json().error === 'UserNotFound') {
                return Observable.throw(new Error('User does not exists.'));
              }
              if (error.json().error === 'InvalidRequest') {
                return Observable.throw(new Error('Some of input is empty.'));
              }
            }
            if (error.status === 401) {
              return Observable.throw(new Error('Unauthorized.'));
            }
            if (error.status === 409) {
              return Observable.throw(new Error('Sorry, that email\'s taken. Try another.'));
            }
            return Observable.throw(new Error(error.json().message));
          }
      });
  }

  updatePassword(userId: string, command: IUpdatePasswordCommand): Observable<any> {
    return this.http.put('http://localhost:5000/user/update/password/' + userId, command, this._authService.createJwtHeader())
      .catch((error: any) => {
        if (error) {
            if (error.status === 400) {
              if (error.json().error === 'UserNotFound') {
                return Observable.throw(new Error('User does not exists.'));
              }
              if (error.json().error === 'InvalidRequest') {
                return Observable.throw(new Error('New passwords is the same as old.'));
              }
            }
            if (error.status === 401) {
              return Observable.throw(new Error('Unauthorized.'));
            }
            if (error.status === 409) {
              return Observable.throw(new Error('Old password does not match.'));
            }
            return Observable.throw(new Error(error.json().message));
        }
      });
  }

  activateUser(command: IActivateUser): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:5000/user/confirm/' + command.userId, command, headers)
      .catch((error: any) => {
        if (error) {
          if (error.status === 400) {
            if (error.json().error === 'UserNotFound') {
              return Observable.throw(new Error('User does not exists.'));
            }
          }
          return Observable.throw(new Error(error.json().message));
        }
      });
  }

  logout(): void {
    this._authService.clearJwtToken();
  }

}
