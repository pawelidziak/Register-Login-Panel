import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginCommand } from '../_models/ILoginCommand';
import { UserService } from '../_services/user.service';
import {Router} from '@angular/router';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCommand: ILoginCommand = {
    email: '',
    password: ''
  };

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  error: string;
  loading: boolean;

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.logout();
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.email = new FormControl('', [
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);
  }

  private createForm(): void {
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
          this._router.navigate(['/home']);
          },
        error => {
          this.error = error.toString().substr(7, error.length);
        });
  }

}
