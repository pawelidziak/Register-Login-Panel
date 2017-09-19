import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { UserService } from './_services/user.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {AuthService} from './_services/auth.service';
import { PasswordConfirmedComponent } from './password-confirmed/password-confirmed.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PasswordConfirmedComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
