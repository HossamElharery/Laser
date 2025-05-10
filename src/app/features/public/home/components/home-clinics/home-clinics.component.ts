import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

interface Clinic {
  id: number;
  name: string;
  rating: number;
  location: string;
  speciality: string;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-home-clinics',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './home-clinics.component.html',
  styleUrls: ['./home-clinics.component.scss']
})
export class HomeClinicsComponent implements OnInit {
  clinics: Clinic[] = [
    {
      id: 1,
      name: 'Clinic Name Here',
      rating: 4.1,
      location: 'Cairo Government',
      speciality: 'Hair Laser',
      image: 'assets/clinic1.jpg',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Clinic Name Here',
      rating: 4.1,
      location: 'Cairo Government',
      speciality: 'Hair Laser',
      image: 'assets/clinic2.jpg',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Clinic Name Here',
      rating: 4.1,
      location: 'Cairo Government',
      speciality: 'Hair Laser',
      image: 'assets/clinic3.jpg',
      isFavorite: false
    }
  ];

  happyClientCount: number = 100;

  constructor() { }

  ngOnInit(): void {
    // Initialize component data
  }

  toggleFavorite(clinic: Clinic): void {
    clinic.isFavorite = !clinic.isFavorite;
    // Here you would typically save this state to a service/backend
  }

  bookAppointment(clinicId: number): void {
    console.log(`Booking appointment with clinic ID: ${clinicId}`);
    // Implement booking logic or navigation
  }

  viewAllClinics(): void {
    console.log('View all clinics clicked');
    // Implement navigation to all clinics page
  }

  navigateClinics(direction: 'prev' | 'next'): void {
    console.log(`Navigate ${direction}`);
    // Implement pagination or sliding logic
  }
}
