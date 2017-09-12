import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';


const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },

  // otherwise redirect to main-content
  {
    path: '**',
    redirectTo: 'main'
  }
] as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
