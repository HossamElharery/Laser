import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\s\-\+\(\)]{8,15}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // Submit form data to backend
    console.log('Form submitted with data:', this.contactForm.value);

    // In a real application, you would call a service here to send the data
    // this.contactService.sendContactForm(this.contactForm.value).subscribe(...);

    // Reset form after successful submission
    this.contactForm.reset();
    this.submitted = false;
  }

  // Field validation helpers
  fieldHasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (!field) return '';

    if (field.errors?.['required']) {
      return 'This field is required';
    }

    if (field.errors?.['email']) {
      return 'Please enter a valid email address';
    }

    if (field.errors?.['minlength']) {
      return `Minimum length is ${field.errors?.['minlength'].requiredLength} characters`;
    }

    if (field.errors?.['pattern']) {
      return 'Please enter a valid phone number';
    }

    return '';
  }
}
