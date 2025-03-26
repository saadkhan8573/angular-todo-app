import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

export enum ButtonType {
  Primary = 'primary',
  PrimaryNew = 'primaryNew',
  Secondary = 'secondary',
  Info = 'info',
  Error = 'error',
  Action = 'action',
  Dark = 'dark',
  Success = 'success',
}

const VariantOptions = [
  'primary',
  'secondary',
  'info',
  'error',
  'action',
  'dark',
  'success',
  'primaryNew',
] as const;

@Component({
  imports: [LoadingComponent],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: (typeof VariantOptions)[number] = 'primary';
  @Input() disabled: boolean = false;
  @Input() rounded: boolean = false;
  @Input() text: string = '';
  @Input() loading: boolean = false;
  @Input() outline: boolean = false;
  @Input() submit: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;
  @Input() mini: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  ButtonType = ButtonType;

  constructor() {}

  onClick(event: MouseEvent): void {
    if (!this.submit && !this.disabled) {
      this.clicked.emit(event);
    }
  }

  getButtonClasses(): string {
    const buttonClass = `cursor-pointer text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 ${
      this.rounded ? 'rounded-full' : 'rounded-md'
    } ${this.fullWidth ? 'w-full' : 'min-w-[80px]'} ${
      this.fullHeight ? 'h-full' : ''
    }`;

    const miniButtonClass = `transition-all duration-300 cursor-pointer w-6 h-6 flex items-center justify-center rounded shadow`;

    const theme = this.getTheme(this.mini ? miniButtonClass : buttonClass);
    const variantTheme = theme[this.variant]; // Now TypeScript knows this is safe

    return this.disabled
      ? variantTheme.disabled
      : this.outline
      ? variantTheme.outline
      : variantTheme.default;
  }

  getLoadingColor(): string {
    const theme = this.getTheme('');
    const variantTheme = theme[this.variant];
    return this.disabled
      ? variantTheme.loading.disabled
      : this.outline
      ? variantTheme.loading.outline
      : variantTheme.loading.default;
  }

  private getTheme(buttonClass: string) {
    return {
      primary: {
        default: `${buttonClass} bg-yellow-500 text-white hover:bg-primary-dark border-transparent ring-primary-light`,
        outline: `${buttonClass} bg-transparent text-primary hover:bg-primary-dark hover:text-white border-primary-dark ring-primary-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent ring-gray-dark`,
        loading: {
          default: 'white',
          outline: '#F7910F',
          disabled: 'white',
        },
      },
      [ButtonType.PrimaryNew]: {
        default: `${buttonClass} bg-primaryNew text-white hover:bg-primaryNew-dark border-transparent ring-primaryNew-light`,
        outline: `${buttonClass} bg-transparent text-primaryNew hover:bg-primaryNew-dark hover:text-white border-primaryNew-dark ring-primaryNew-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent ring-gray-dark`,
        loading: {
          default: 'white',
          outline: '#F7910F',
          disabled: 'white',
        },
      },
      [ButtonType.Secondary]: {
        default: `${buttonClass} bg-secondary text-dark hover:bg-secondary-dark border-transparent ring-primary-light`,
        outline: `${buttonClass} bg-transparent text-dark hover:bg-secondary-dark border-secondary-dark ring-primary-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'black',
          outline: 'black',
          disabled: 'white',
        },
      },
      [ButtonType.Info]: {
        default: `${buttonClass} bg-info text-white hover:bg-info-light border-transparent ring-info-light`,
        outline: `${buttonClass} bg-transparent text-dark hover:bg-info-light border-info ring-info-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'black',
          outline: 'black',
          disabled: 'white',
        },
      },
      [ButtonType.Error]: {
        default: `${buttonClass} bg-error text-white hover:bg-error-light border-transparent ring-error-light`,
        outline: `${buttonClass} bg-transparent text-error hover:bg-error-light border-error ring-error-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'white',
          outline: 'red',
          disabled: 'white',
        },
      },
      [ButtonType.Action]: {
        default: `${buttonClass} bg-white text-gray-600 hover:bg-gray-200 border-transparent ring-primary-light`,
        outline: `${buttonClass} bg-white text-gray-600 hover:bg-gray-200 border-transparent ring-primary-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'black',
          outline: 'black',
          disabled: 'white',
        },
      },
      [ButtonType.Dark]: {
        default: `${buttonClass} bg-typography text-white hover:bg-slate-600 border-transparent ring-primary-light`,
        outline: `${buttonClass} bg-transparent text-gray-600 hover:bg-slate-600 hover:text-white border-secondary-text ring-primary-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'black',
          outline: '#2D3748',
          disabled: 'white',
        },
      },
      [ButtonType.Success]: {
        default: `${buttonClass} bg-success text-white hover:bg-success-dark border-transparent ring-success-light`,
        outline: `${buttonClass} bg-transparent text-success hover:bg-success hover:text-white border-success-dark ring-success-light`,
        disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
        loading: {
          default: 'white',
          outline: '#2D3748',
          disabled: 'white',
        },
      },
    };
  }
}
