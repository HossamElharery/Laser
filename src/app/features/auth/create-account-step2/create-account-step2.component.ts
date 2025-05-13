import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-account-step2.component.html',
  styleUrl: './create-account-step2.component.scss'
})
export class CreateAccountStep2Component implements OnInit {
  clinicForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
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
      // Will add actual submission logic
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
