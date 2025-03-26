import { Component } from '@angular/core';
import { TodoComponent } from './features';
import { DataListComponent } from './features/home/data-list/data-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [DataListComponent, TodoComponent],
})
export class AppComponent {
  title = 'ang-auth';
}
