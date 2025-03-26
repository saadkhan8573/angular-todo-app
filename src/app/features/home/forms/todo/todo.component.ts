import { z } from 'zod';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ButtonComponent,
  SelectComponent,
  TextInputComponent,
} from '../../../../components';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from '../../../../components/inputs/text-area';
import { ErrorMessageComponent } from '../../../../components/inputs/error-message';
import { FormValidationService } from '../../../../services/form/form-service.service';
import { Store } from '@ngrx/store';
import { submitTodoForm, TodoState } from '../../../../store/todo/todo.actions';

const contactSchema = z.object({
  name: z
    .string()
    .min(3, 'Minimum 3 characters required')
    .nonempty('Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  message: z
    .string()
    .min(10, 'Minimum 10 characters required')
    .nonempty('Message is required'),
  city: z.any().refine((val) => val !== null, {
    message: 'Select a city',
  }),
});

@Component({
  selector: 'app-todo',
  imports: [
    CommonModule,
    SelectComponent,
    ButtonComponent,
    TextAreaComponent,
    TextInputComponent,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  private fb = inject(FormBuilder);

  private store: Store<{ todo: TodoState }> = inject(
    Store<{ todo: TodoState }>
  );
  formData$ = this.store.select((state) => state.todo.formData);

  // Selectors for reactive state
  public validationService = inject(FormValidationService); // Public for template access
  contactForm = this.fb.group({
    name: [''],
    email: [''],
    message: [''],
    city: [null],
  });
  // contactForm: FormGroup;
  submitError: string = '';
  isSubmitting: boolean = false;

  constructor() {
    // Attach schema to form group for child components to access
    (this.contactForm as any).schema = contactSchema;
  }

  ngOnInit() {
    // Initialize validation with schema and form
    this.validationService.initializeFormValidation(
      contactSchema,
      this.contactForm
    );
  }

  ngOnDestroy() {
    // Cleanup subscriptions when component is destroyed
    this.validationService.cleanup();
  }

  onSubmit() {
    this.submitError = '';
    this.isSubmitting = true;

    this.contactForm.markAllAsTouched();
    const isValid = this.validationService.validateAllFields(
      contactSchema,
      this.contactForm
    );

    if (!isValid) {
      this.submitError = 'Please fix the errors above before submitting.';
      this.isSubmitting = false;
      return;
    }

    let len = 0;
    this.formData$.subscribe((val) => (len = val.length + 1));

    this.formData$.subscribe((val) => console.log('Hee aaa', val));

    setTimeout(() => {
      if (isValid) {
        this.store.dispatch(
          submitTodoForm({
            ...this.contactForm.value,
            id: len,
          } as any)
        );
      }
      this.contactForm.reset();
      this.isSubmitting = false;
    }, 1000);
  }
}
