// textarea.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../services/form/form-service.service';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `text-area.component.html`,
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() label: string = '';
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
