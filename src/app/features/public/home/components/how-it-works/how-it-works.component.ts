import { Component, OnInit } from '@angular/core';

interface Offer {
  id: number;
  title: string;
  description: string;
  clinic: string;
  location: string;
  price: string;
  discount: string;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  offers: Offer[] = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet.',
      description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
      clinic: 'Clinic Name Here',
      location: 'Cairo Government',
      price: '5000 LE',
      discount: '25% Offer',
      image: 'assets/images/treatment-img.jpg',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet.',
      description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
      clinic: 'Clinic Name Here',
      location: 'Cairo Government',
      price: '5000 LE',
      discount: '25% Offer',
      image: 'assets/images/treatment-img.jpg',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet.',
      description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
      clinic: 'Clinic Name Here',
      location: 'Cairo Government',
      price: '5000 LE',
      discount: '25% Offer',
      image: 'assets/images/treatment-img.jpg',
      isFavorite: false
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet.',
      description: 'Lorem ipsum dolor sit amet consectetur. Mi fames cras viverra pharetra tristique',
      clinic: 'Clinic Name Here',
      location: 'Cairo Government',
      price: '5000 LE',
      discount: '25% Offer',
      image: 'assets/images/treatment-img.jpg',
      isFavorite: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleFavorite(offer: Offer): void {
    offer.isFavorite = !offer.isFavorite;
    // Here you would typically save this state to a service or backend
  }
}
