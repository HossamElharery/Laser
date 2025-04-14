import { Routes } from '@angular/router';
import { LanguageGuard } from './core/guards/language.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'en'
  },
  {
    path: ':lang',
    canActivate: [LanguageGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/public/public.routes').then(m => m.default)
      },
      // {
      //   path: 'auth',
      //   loadChildren: () => import('./features/auth/auth.routes').then(m => m.default)
      // },
      // {
      //   path: 'client-profile',
      //   loadChildren: () => import('./features/client-profile/client-profile.routes').then(m => m.default)
      // },
      // {
      //   path: 'clinic-profile',
      //   loadChildren: () => import('./features/clinic-profile/clinic-profile.routes').then(m => m.default)
      // }
    ]
  },
  {
    path: '**',
    redirectTo: 'en'
  }
];
