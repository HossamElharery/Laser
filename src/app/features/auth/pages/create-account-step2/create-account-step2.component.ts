// create-account-step2.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { AuthNavBarComponent } from '../../shared/auth-nav-bar/auth-nav-bar.component';

@Component({
  selector: 'app-create-account-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthNavBarComponent],
  templateUrl: './create-account-step2.component.html',
  styleUrls: ['./create-account-step2.component.scss']
})
export class CreateAccountStep2Component implements OnInit {
  clinicForm!: FormGroup;
  showPassword = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  ngOnInit(): void {
    this.initForm();

    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });
  }

  initForm(): void {
    this.clinicForm = this.fb.group({
      fullName: ['', [Validators.required]],
      clinicName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      clinicAddress: ['', [Validators.required]],
      phoneCode: ['(20)', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.clinicForm.valid) {
      console.log('Form submitted:', this.clinicForm.value);
      // After successful form submission, redirect to success page
      this.router.navigate(['/', this.currentLanguage, 'auth', 'signup-success']);
    } else {
      this.markFormGroupTouched(this.clinicForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
