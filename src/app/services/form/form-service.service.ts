// form-validation.service.ts
import { z } from 'zod';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private errors: { [key: string]: string | null } = {};
  private displayErrors: { [key: string]: string | null } = {};
  private subscriptions: Subscription[] = [];

  // Initialize the form validation with a schema and form group
  initializeFormValidation<T>(schema: z.ZodObject<any>, form: FormGroup): void {
    this.errors = {};
    this.displayErrors = {};
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];

    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control) {
        const sub = control.valueChanges.subscribe((value) => {
          this.validateField(schema, field, value);
          if (control.touched) {
            this.updateDisplayErrors(field);
          }
        });
        this.subscriptions.push(sub);
      }
    });
  }

  // Validate a single field
  validateField<T>(schema: z.ZodObject<any>, field: string, value: any): void {
    try {
      schema.shape[field].parse(value);
      this.errors[field] = null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors[field] = error.errors[0].message;
        // this.updateDisplayErrors(field);
      }
    }
  }

  // Update display errors based on touched state
  updateDisplayErrors(field: string): void {
    this.displayErrors[field] = this.errors[field];
  }

  // Validate the entire form
  validateAllFields<T>(schema: z.ZodObject<any>, form: FormGroup): boolean {
    try {
      schema.parse(form.value);
      this.errors = {};
      this.displayErrors = {};
      return true;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        this.errors = {};
        this.displayErrors = {};
        error.errors.forEach((err: any) => {
          const field = err.path[0] as string;
          this.errors[field] = err.message;
          this.displayErrors[field] = err.message; // Show all errors on submit
        });
        return false;
      }
      return false;
    }
  }

  // Get errors for display
  getDisplayErrors(): { [key: string]: string | null } {
    return { ...this.displayErrors };
  }

  // Check if there are any errors
  hasErrors(): boolean {
    return Object.values(this.errors).some((error) => error !== null);
  }

  // Cleanup subscriptions
  cleanup(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
    this.errors = {};
    this.displayErrors = {};
  }
}
