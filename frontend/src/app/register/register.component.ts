import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterCommand} from '../_models/RegisterCommand';
import {UserService} from '../_services/user.service';

@Component({
  // selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerCommand: RegisterCommand = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  loading = false;

  registerForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  response: string;
  error: string;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|\'<>.^*()\\%!-]).+$')
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required
    ]);
  }

  private createForm(): void {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  register() {
    if (this.password.value === this.confirmPassword.value) {
      this._userService.register(this.registerCommand)
        .subscribe(
          res => {
            this.error = '';
            this.response = 'You have been registered! You can log in now.';
          },
          error => {
            this.response = '';
            this.error = error.toString().substr(7, error.length);
          });
    }
  }
}
