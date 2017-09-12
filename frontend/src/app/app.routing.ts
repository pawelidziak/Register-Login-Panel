import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // otherwise redirect to main-content
  {
    path: '**',
    redirectTo: 'register'
  }
] as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
