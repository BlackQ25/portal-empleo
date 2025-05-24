import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }
  goHome(): void {
    this.router.navigate(['/catalog']);
  }
}
