import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule],
  styleUrl: './select.component.css',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() options: { id: number; name: string }[] = [];
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() label: string = '';
  @Input() multiple: boolean = false;
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'London' },
    { id: 3, name: 'Tokyo' },
  ];
}
