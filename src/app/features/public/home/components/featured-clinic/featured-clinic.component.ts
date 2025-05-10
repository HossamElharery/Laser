import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-featured-clinic',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './featured-clinic.component.html',
  styleUrl: './featured-clinic.component.scss'
})
export class FeaturedClinicComponent {
  // You can add component logic here if needed
}
