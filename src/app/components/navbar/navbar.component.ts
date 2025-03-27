import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false; // You would typically get this from an auth service

  showMobileMenu: boolean = false;

  constructor() {
    // In a real app, you'd inject an auth service here and subscribe to login status
    // For demo purposes, setting it manually
    this.checkLoginStatus();
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  checkLoginStatus() {
    // This is a placeholder - in reality, you'd check with your auth service
    // this.isLoggedIn = localStorage.getItem('token') !== null;
    // Example condition
  }

  logout() {
    // Implement your logout logic here
    // localStorage.removeItem('token'); // Example
    // this.isLoggedIn = false;
    // Add navigation to login page if needed
  }
}
