import { Routes } from '@angular/router';
import { TodoComponent } from './features';
import { DataListComponent } from './features/home/data-list/data-list.component';
// import { HomeComponent } from './home/home.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProfileComponent } from './profile/profile.component';
// import { SettingsComponent } from './settings/settings.component';
// import { AboutComponent } from './about/about.component';
// import { ServicesComponent } from './services/services.component';
// import { LoginComponent } from './login/login.component';

// Define routes
export const routes: Routes = [
  //   { path: 'home', component: HomeComponent },
  //   { path: 'about', component: AboutComponent },
  //   { path: 'services', component: ServicesComponent },
  //   { path: 'login', component: LoginComponent },
  //   { path: 'dashboard', component: DashboardComponent },
  //   { path: 'profile', component: ProfileComponent },
  { path: 'data-list', component: DataListComponent },
  { path: '', pathMatch: 'full', component: TodoComponent },
  { path: '**', redirectTo: '/' },
];
