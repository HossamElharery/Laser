// login.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { AuthNavBarComponent } from '../../shared/auth-nav-bar/auth-nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthNavBarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  private fb = inject(FormBuilder);
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Will implement actual login logic
    } else {
      this.markFormGroupTouched(this.loginForm);
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
