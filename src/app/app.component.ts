import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroBookOpen } from '@ng-icons/heroicons/outline';
import { NavbarComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavbarComponent, RouterModule],
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
