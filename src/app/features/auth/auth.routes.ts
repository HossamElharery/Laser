import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
      },
      {
        path: 'choose-account-type',
        loadComponent: () => import('./pages/choose-account-type/choose-account-type.component').then(m => m.ChooseAccountTypeComponent)
      },
      {
        path: 'create-account-step2',
        loadComponent: () => import('./pages/create-account-step2/create-account-step2.component').then(m => m.CreateAccountStep2Component)
      },
      {
        path: 'signup-success',
        loadComponent: () => import('./pages/signup-success/signup-success.component').then(m => m.SignupSuccessComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'confirm-otp',
        loadComponent: () => import('./pages/confirm-otp/confirm-otp.component').then(m => m.ConfirmOtpComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
