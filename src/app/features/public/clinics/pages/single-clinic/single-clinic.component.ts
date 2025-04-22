import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-clinic',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './single-clinic.component.html',
  styleUrl: './single-clinic.component.scss'
})
export class SingleClinicComponent implements OnInit {
  // Tab management
  activeTab: string = 'about';

  // Clinic data
  clinicId: string = '';
  clinic: any = {
    id: '1',
    title: 'Clinic Title Here',
    address: '2336 Terry Roads',
    rating: 4.1,
    price: 5000,
    discount: 25,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    fullDescription: 'Lorem ipsum dolor sit amet consectetur. Purus turpis platea cursus non id pellentesque. Sed mauris eleifend pellentesque morbi. Nisl cursus tempus at nisl orci tempus et penatibus. Cras lobortis euismod tristique eget massa tellus eleifend.',
    services: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet.',
        description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
        duration: 30,
        location: 'Cairo Government',
        price: 5000,
        discount: 25
      },
      {
        id: '2',
        title: 'Lorem ipsum dolor sit amet.',
        description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
        duration: 30,
        location: 'Cairo Government',
        price: 5000,
        discount: 25
      },
      {
        id: '3',
        title: 'Lorem ipsum dolor sit amet.',
        description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
        duration: 30,
        location: 'Cairo Government',
        price: 5000,
        discount: 25
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet.',
        description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
        duration: 30,
        location: 'Cairo Government',
        price: 5000,
        discount: 25
      }
    ],
    reviews: {
      overallRating: 4.8,
      ratings: {
        '5': 70,
        '4': 15,
        '3': 10,
        '2': 3,
        '1': 2
      },
      reviewItems: [
        {
          id: '1',
          userName: 'Mohamed Ahmed',
          userInitials: 'MA',
          rating: 5,
          title: 'Great Service',
          text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          date: '3 Days ago',
          likes: 5
        },
        {
          id: '2',
          userName: 'Mohamed Ahmed',
          userInitials: 'MA',
          rating: 5,
          title: 'Great Service',
          text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          date: '3 Days ago',
          likes: 3
        },
        {
          id: '3',
          userName: 'Mohamed Ahmed',
          userInitials: 'MA',
          rating: 5,
          title: 'Great Service',
          text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
          date: '3 Days ago',
          likes: 1
        }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get clinic ID from route params
    this.route.params.subscribe(params => {
      this.clinicId = params['id'];
      // In a real app, you would fetch clinic data using this ID
      // this.loadClinicData(this.clinicId);
    });

    // Get active tab from query params if available
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['tab']) {
        this.activeTab = queryParams['tab'];
      }
    });
  }

  /**
   * Set the active tab
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  /**
   * Book an appointment with this clinic
   */
  bookAppointment(): void {
    // Navigate to booking page or open modal
    console.log('Booking appointment with clinic:', this.clinicId);
  }

  /**
   * Toggle favorite status for the clinic
   */
  toggleFavorite(): void {
    // Add/remove clinic from favorites
    console.log('Toggle favorite for clinic:', this.clinicId);
  }

  /**
   * Write a review for the clinic
   */
  writeReview(): void {
    // Navigate to review page or open modal
    console.log('Writing review for clinic:', this.clinicId);
  }

  /**
   * Like a review
   */
  likeReview(reviewId: string): void {
    console.log('Liked review:', reviewId);
  }
}
