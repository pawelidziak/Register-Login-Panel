import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {IUser} from '../_models/IUser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateCommand} from '../_models/UpdateCommand';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

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

  currentUserName: string;

  dataForm: FormGroup;
  id: FormControl;
  name: FormControl;
  email: FormControl;
  role: FormControl;
  joinedAt: FormControl;

  changePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;
  isPasswordChecked: boolean;

  loading: boolean;


  private _response = new Subject<string>();
  response: string;
  isResError: boolean;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this._userService.getMe()
      .subscribe(
        res => {
          this.currentUser.id = res.id;
          this.currentUser.name = this.currentUserName = res.name;
          this.currentUser.email = res.email;
          this.currentUser.role = res.role;
          this.currentUser.createdAt = new Date(res.createdAt);
        },
        error => {
          console.log(error);
        });
    this.createFormControls();
    this.createForm();

    this._response.subscribe((message) => this.response = message);
    debounceTime.call(this._response, 5000).subscribe(() => this.response = null);
  }

  private createFormControls(): void {
    this.id = new FormControl({value: this.currentUser.email, disabled: true}, Validators.required);
    this.name = new FormControl(this.currentUser.name, [
      Validators.required,
    ]);
    this.email = new FormControl(this.currentUser.email, [
      Validators.required,
      Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
    ]);
    this.role = new FormControl({value: this.currentUser.role, disabled: true}, Validators.required);
    this.joinedAt = new FormControl({value: this.currentUser.role, disabled: true}, Validators.required);

    this.oldPassword = new FormControl('', Validators.required);
    this.newPassword = new FormControl('', [
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
    this.dataForm = new FormGroup({
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      joinedAt: this.joinedAt
    });

    this.changePasswordForm = new FormGroup({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }

  update(): void {
    const command: UpdateCommand = {
      name: this.currentUser.name,
      email: this.currentUser.email
    };
    this._userService.update(this.currentUser.id, command)
      .subscribe(
        res => {
          this.isResError = false;
          this._response.next('Data updated correctly.');
          this.currentUserName = this.currentUser.name;
        },
        error => {
          this.isResError = true;
          this._response.next(error.toString().substr(7, error.length));
        });
  }

  checkRes = () => this.isResError ? 'danger' : 'success';


  isNullOrWhitespace() {
    return !this.name.value || !this.name.value.trim();
  }

}
