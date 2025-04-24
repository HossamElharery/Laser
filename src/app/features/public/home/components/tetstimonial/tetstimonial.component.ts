import { Component } from '@angular/core';
interface Testimonial {
  id: number;
  userName: string;
  userTitle: string;
  userAvatar: string;
  testimonialText: string;
}

@Component({
  selector: 'app-tetstimonial',
  imports: [],
  templateUrl: './tetstimonial.component.html',
  styleUrl: './tetstimonial.component.scss'
})
export class TetstimonialComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      userName: 'User Name',
      userTitle: 'Title here',
      userAvatar: '../../../../../../assets/imgs/Ellipse_3.png',
      testimonialText: 'Lorem ipsum dolor sit amet consectetur. Eget adipiscing ac aliquam amet feugiat amet cursus consequat. Dignissim tempus adipiscing est.'
    },
    {
      id: 2,
      userName: 'User Name',
      userTitle: 'Title here',
      userAvatar: '../../../../../../assets/imgs/Ellipse_3.png',
      testimonialText: 'Lorem ipsum dolor sit amet consectetur. Eget adipiscing ac aliquam amet feugiat amet cursus consequat. Dignissim tempus adipiscing est.'
    },
    {
      id: 3,
      userName: 'User Name',
      userTitle: 'Title here',
      userAvatar: '../../../../../../assets/imgs/Ellipse_3.png',
      testimonialText: 'Lorem ipsum dolor sit amet consectetur. Eget adipiscing ac aliquam amet feugiat amet cursus consequat. Dignissim tempus adipiscing est.'
    }
  ];

  currentSlide = 0;
  totalSlides = 1; // Will be calculated based on testimonials and display count

  constructor() { }

  ngOnInit(): void {
    // Initialize carousel logic if needed
    this.calculateTotalSlides();
  }

  calculateTotalSlides(): void {
    // Calculate total slides based on viewport size
    // This is a simplified example - in a real application, you would check the viewport width
    // and determine how many testimonials can be shown at once
    const testimonialsPerSlide = window.innerWidth >= 768 ? 3 : 1;
    this.totalSlides = Math.ceil(this.testimonials.length / testimonialsPerSlide);
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    // Add slide transition logic here
    console.log('Navigating to previous slide:', this.currentSlide);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    // Add slide transition logic here
    console.log('Navigating to next slide:', this.currentSlide);
  }
}
