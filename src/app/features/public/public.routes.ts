import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'clinics',
    loadComponent: () => import('./clinics/clinics.component').then(m => m.ClinicsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
