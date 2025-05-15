// confirm-otp.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { AuthNavBarComponent } from '../../shared/auth-nav-bar/auth-nav-bar.component';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthNavBarComponent],
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss']
})
export class ConfirmOtpComponent implements OnInit {
  otpForm!: FormGroup;
  otpLength = 6;
  otpControls: number[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  constructor() {
    this.otpControls = Array(this.otpLength).fill(0).map((_, i) => i);
  }

  ngOnInit(): void {
    this.initForm();

    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });

    // Auto-focus on input fields
    this.setupOtpInputAutoFocus();
  }

  initForm(): void {
    const controls: Record<string, any> = {};
    for (let i = 0; i < this.otpLength; i++) {
      controls[`otp${i}`] = ['', [Validators.required, Validators.pattern(/^[0-9]$/)]];
    }
    this.otpForm = this.fb.group(controls);
  }

  setupOtpInputAutoFocus(): void {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
          const htmlInput = input as HTMLInputElement;

          // Move focus to the next input on input
          htmlInput.addEventListener('input', () => {
            if (htmlInput.value && index < otpInputs.length - 1) {
              (otpInputs[index + 1] as HTMLInputElement).focus();
            }
          });

          // Handle backspace to go back
          htmlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !htmlInput.value && index > 0) {
              (otpInputs[index - 1] as HTMLInputElement).focus();
            }
          });
        });

        // Focus the first input initially
        if (otpInputs.length > 0) {
          (otpInputs[0] as HTMLInputElement).focus();
        }
      }, 0);
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      // Combine all OTP values
      const otpValue = this.otpControls
        .map(i => this.otpForm.get(`otp${i}`)?.value)
        .join('');

      console.log('OTP submitted:', otpValue);
      // After successful OTP verification, redirect to reset password page
      this.router.navigate(['/', this.currentLanguage, 'auth', 'reset-password']);
    } else {
      this.markFormGroupTouched(this.otpForm);
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

  resendOtp(): void {
    console.log('Resending OTP...');
    // Logic to resend OTP would go here
  }
}
