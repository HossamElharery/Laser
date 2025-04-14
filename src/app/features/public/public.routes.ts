import { Route } from '@angular/router';
import { PublicComponent } from './public/public.component';

export default [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        title: 'Home'
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(c => c.AboutComponent),
        title: 'About Us'
      },
      {
        path: 'clinics',
        loadComponent: () => import('./clinics/clinics.component').then(c => c.ClinicsComponent),
        title: 'Clinics'
      },
      {
        path: 'blog',
        loadComponent: () => import('./blog/blog.component').then(c => c.BlogComponent),
        title: 'Blog'
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(c => c.ContactComponent),
        title: 'Contact Us'
      }
    ]
  }
] as Route[];
