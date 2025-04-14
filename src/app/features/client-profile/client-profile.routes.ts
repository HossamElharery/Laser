import { Routes } from '@angular/router';
import { ProfileLayoutComponent } from '../../layouts/profile-layout/profile-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      { path: 'bookings', loadComponent: () => import('./bookings/bookings.component').then(m => m.BookingsComponent) },
      { path: 'wishlist', loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
      { path: '**', redirectTo: 'bookings' }
    ]
  }
];
