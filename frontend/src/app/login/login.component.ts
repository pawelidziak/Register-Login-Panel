import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCommand } from '../_models/LoginCommand';
import { UserService } from '../_services/user.service';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCommand: LoginCommand = {
    email: '',
    password: ''
  };

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  error: string;
  loading: boolean;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.email = new FormControl('', [
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login(): void {
    this._userService.login(this.loginCommand)
      .subscribe(
        res => {
          this.error = '';
          console.log(res);
        },
        error => {
          this.error = error.toString().substr(7, error.length);;
        });
  }
}
