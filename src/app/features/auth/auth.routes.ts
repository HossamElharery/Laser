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
        path: 'choose-account-type',
        loadComponent: () => import('./choose-account-type/choose-account-type.component').then(m => m.ChooseAccountTypeComponent)
      },
      {
        path: 'create-account-step2',
        loadComponent: () => import('./create-account-step2/create-account-step2.component').then(m => m.CreateAccountStep2Component)
      },
      {
        path: 'signup-success',
        loadComponent: () => import('./signup-success/signup-success.component').then(m => m.SignupSuccessComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'confirm-otp',
        loadComponent: () => import('./confirm-otp/confirm-otp.component').then(m => m.ConfirmOtpComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];