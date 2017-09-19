import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {PasswordConfirmedComponent} from './password-confirmed/password-confirmed.component';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/confirm/:id',
    component: PasswordConfirmedComponent
  },
  // otherwise redirect to main-content
  {
    path: '**',
    redirectTo: 'home'
  }
] as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
