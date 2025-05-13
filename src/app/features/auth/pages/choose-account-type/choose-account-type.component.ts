import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-choose-account-type',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './choose-account-type.component.html',
  styleUrl: './choose-account-type.component.scss'
})
export class ChooseAccountTypeComponent {
  accountTypes = [
    { id: 'clinic', title: 'Clinic', description: 'Showcase your services, manage bookings, and grow your practice.', icon: 'bi-plus-circle', selected: true },
    { id: 'customer', title: 'Customer', description: 'Showcase your services, manage bookings, and grow your practice.', icon: 'bi-person', selected: false }
  ];

  selectAccountType(selectedId: string): void {
    this.accountTypes.forEach(type => {
      type.selected = type.id === selectedId;
    });
  }

  continue(): void {
    // Navigate to next step based on selected account type
    const selectedType = this.accountTypes.find(type => type.selected);
    console.log(`Selected account type: ${selectedType?.id}`);
    // Will add actual navigation logic
  }
}