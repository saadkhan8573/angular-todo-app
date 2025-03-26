import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroBookOpen } from '@ng-icons/heroicons/outline';
import { IconComponent } from './components/icon';
import { TodoComponent } from './features';
import { DataListComponent } from './features/home/data-list/data-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [DataListComponent, IconComponent, TodoComponent],
  providers: [
    provideIcons({
      heroBookOpen,
      // Add the specific icons you want to use
    }),
  ],
})
export class AppComponent {
  title = 'ang-auth';
}
