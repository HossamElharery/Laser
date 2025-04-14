import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  { 
    path: '',
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: 'signup', 
        loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) 
      },
      { 
        path: 'reset-password', 
        loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent) 
      },
      { 
        path: '**', 
        redirectTo: 'login' 
      }
    ]
  }
];