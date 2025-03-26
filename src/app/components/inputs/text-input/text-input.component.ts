// input.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../services/form/form-service.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./text-input.component.html`,
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() hasError: boolean = false;

  constructor(private validationService: FormValidationService) {}

  onBlur() {
    const control = this.formGroup.get(this.controlName);
    control?.markAsTouched();
    this.validationService.validateField(
      (this.formGroup as any).schema,
      this.controlName,
      control?.value
    );
    this.validationService.updateDisplayErrors(this.controlName);
  }
}
