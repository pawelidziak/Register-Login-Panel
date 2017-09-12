import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {IUser} from '../_models/IUser';

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: IUser = {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: null
  };

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getMe()
      .subscribe(
      res => {
        this.currentUser.id = res.id;
        this.currentUser.name = res.name;
        this.currentUser.email = res.email;
        this.currentUser.role = res.role;
        this.currentUser.createdAt = res.createdAt;
      },
      error => {
        console.log(error);
      });
  }

}
