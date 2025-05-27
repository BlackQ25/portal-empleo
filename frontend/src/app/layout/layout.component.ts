import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userEmail: string | null = null;
  isSidebarOpen = true;
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSidebarOpen = false;
      }
    });
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.role = this.authService.getUserRole();
    console.log('Rol del usuario:', this.role);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate(['/catalog']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToApplications() {
    this.router.navigate(['/applications']);
  }

  goToManagement(){
    this.router.navigate(['/admin-management']);
  }

  goToUsersCatalog(){
    this.router.navigate(['/users-catalog']);
  }
}
