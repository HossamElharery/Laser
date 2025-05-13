import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.scss'
})
export class SignupSuccessComponent {

  navigateToHome(): void {
    // Will add navigation logic
    console.log('Navigating to home');
  }
}
