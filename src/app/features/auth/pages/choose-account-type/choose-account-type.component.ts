// choose-account-type.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { AuthNavBarComponent } from '../../shared/auth-nav-bar/auth-nav-bar.component';

interface AccountType {
  id: string;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-choose-account-type',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthNavBarComponent],
  templateUrl: './choose-account-type.component.html',
  styleUrls: ['./choose-account-type.component.scss']
})
export class ChooseAccountTypeComponent {
  accountTypes: AccountType[] = [
    {
      id: 'clinic',
      title: 'Clinic',
      description: 'Showcase your services, manage bookings, and grow your practice.',
      icon: 'bi-plus-circle',
      selected: true
    },
    {
      id: 'customer',
      title: 'Customer',
      description: 'Find the best clinics, book treatments, and manage your appointments.',
      icon: 'bi-person',
      selected: false
    }
  ];

  private router = inject(Router);
  private languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  constructor() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });
  }

  selectAccountType(selectedId: string): void {
    this.accountTypes.forEach(type => {
      type.selected = type.id === selectedId;
    });
  }

  continue(): void {
    // Navigate to next step based on selected account type
    const selectedType = this.accountTypes.find(type => type.selected);
    console.log(`Selected account type: ${selectedType?.id}`);

    if (selectedType?.id === 'clinic') {
      // Navigate to clinic signup form
      this.router.navigate(['/', this.currentLanguage, 'auth', 'create-account-step2']);
    } else {
      // Navigate to regular customer signup form
      this.router.navigate(['/', this.currentLanguage, 'auth', 'signup']);
    }
  }
}
