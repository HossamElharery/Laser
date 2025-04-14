import { Routes } from '@angular/router';
import { LanguageGuard } from './core/guards/language.guard';

export const routes: Routes = [
  // Direct access to root redirects to default language (en)
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },
  // Routes with language parameter
  {
    path: ':lang',
    canActivate: [LanguageGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/public/public.component').then(m => m.PublicComponent),
        loadChildren: () => import('./features/public/public.routes').then(m => m.routes)
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes)
      },
      {
        path: 'client-profile',
        loadChildren: () => import('./features/client-profile/client-profile.routes').then(m => m.routes)
      },
      {
        path: 'clinic-profile',
        loadChildren: () => import('./features/clinic-profile/clinic-profile.routes').then(m => m.routes)
      }
    ]
  },
  // Catch-all route to redirect to default language
  {
    path: '**',
    redirectTo: 'en'
  }
];
