import { Routes } from '@angular/router';
import { ProfileLayoutComponent } from '../../layouts/profile-layout/profile-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    // children: [
    //   { path: 'appointments', loadComponent: () => import('./appointments/appointments.component').then(m => m.AppointmentsComponent) },
    //   { path: 'services', loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent) },
    //   { path: 'specialists', loadComponent: () => import('./specialists/specialists.component').then(m => m.SpecialistsComponent) },
    //   { path: 'payments', loadComponent: () => import('./payments/payments.component').then(m => m.PaymentsComponent) },
    //   { path: 'reviews', loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent) },
    //   { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
    //   { path: '**', redirectTo: 'appointments' }
    // ]
  }
];
