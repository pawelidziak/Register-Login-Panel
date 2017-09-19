import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IActivateUser} from '../_models/IActivateUser';

@Component({
  selector: 'app-password-confirmed',
  templateUrl: './password-confirmed.component.html',
  styleUrls: ['./password-confirmed.component.css']
})
export class PasswordConfirmedComponent implements OnInit, OnDestroy {

  error: string;
  response: string;
  loading: boolean;

  private command: IActivateUser = {
    userId: ''
  };

  private sub: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
    params => {
      this.command.userId = params['id'];
      this.activateUser(this.command);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  activateUser(userId: IActivateUser): void {
    this._userService.activateUser(userId)
      .subscribe(
        res => {
          this.error = '';
          this.response = 'The account has been activated. You can login now.';
        },
        error => {
          this.response = '';
          this.error = error.toString().substr(7, error.length);
        });
  }
}
