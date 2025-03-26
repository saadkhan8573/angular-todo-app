import { NgIcon } from '@ng-icons/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  standalone: true,
})
export class IconComponent {
  @Input() iconName: string = '';
  @Input() size: string = '46';
  @Input() icons?: {
    size: string;
    iconName: string;
    onIconClick: () => void;
  }[];
  @Input() onIconClick: () => void = () => {};
}
