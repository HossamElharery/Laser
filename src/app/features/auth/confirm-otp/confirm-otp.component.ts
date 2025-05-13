import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-otp',
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.scss'
})
export class ConfirmOtpComponent {
  otpForm: FormGroup;
  otpControls = Array(6).fill(0);

  constructor(private fb: FormBuilder) {
    const controls: { [key: string]: FormControl } = {};
    for (let i = 0; i < 6; i++) {
      controls['otp' + i] = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]$/)]);
    }
    this.otpForm = this.fb.group(controls);
  }

  onSubmit() {
    if (this.otpForm.valid) {
      // Handle OTP confirmation logic here
    }
  }
}
