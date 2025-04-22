import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../../core/services/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.scss'
})
export class ClinicsComponent implements OnInit, OnDestroy {
  // Language service for routing
  private languageService = inject(LanguageService);
  private destroy$ = new Subject<void>();
  currentLanguage = this.languageService.currentLanguage;

  // For filter toggles
  openFilters: Set<string> = new Set(['locations']); // Default open filter

  // Price range slider
  priceRange: number[] = [100, 500];

  // Pagination
  pageSize: number = 15;
  totalResults: number = 50;

  // Mock clinic data
  clinics: any[] = [];

  ngOnInit(): void {
    // Subscribe to language changes
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });

    // Initialize mock clinic data
    this.initClinics();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Toggle filter sections open/closed
   */
  toggleFilter(filterName: string): void {
    if (this.openFilters.has(filterName)) {
      this.openFilters.delete(filterName);
    } else {
      this.openFilters.add(filterName);
    }
  }

  /**
   * Check if a filter section is open
   */
  isFilterOpen(filterName: string): boolean {
    return this.openFilters.has(filterName);
  }

  /**
   * Initialize mock clinic data
   */
  private initClinics(): void {
    // Create 9 clinic entries for the grid display
    for (let i = 1; i <= 9; i++) {
      this.clinics.push({
        id: i,
        name: 'Clinic Name Here',
        image: '../../.././../../../assets/imgs/clinic/Clinic Image.png',
        rating: 4.7,
        type: 'Cairo Government',
        service: 'Hair Laser'
      });
    }
  }
}
