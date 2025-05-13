import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.scss'
})
export class ConfirmOtpComponent implements OnInit {
  otpForm!: FormGroup;
  otpLength = 6;
  otpControls: number[] = [];

  constructor(private fb: FormBuilder) {
    this.otpControls = Array(this.otpLength).fill(0).map((_, i) => i);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const controls: Record<string, any> = {};
    for (let i = 0; i < this.otpLength; i++) {
      controls[`otp${i}`] = ['', [Validators.required, Validators.pattern(/^[0-9]$/)]];
    }
    this.otpForm = this.fb.group(controls);

    // Auto-focus on input fields
    this.setupOtpInputAutoFocus();
  }

  setupOtpInputAutoFocus(): void {
    if (typeof document !== 'undefined') {
      // Note: We need to add this listener after the view is initialized
      // This would typically be added in ngAfterViewInit, but for simplicity I'm putting it here
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
      // Will add actual submission logic
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
    // Will add actual resend logic
  }
}
