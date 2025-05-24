import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  userEmail: string | null = null;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      this.userEmail = this.authService.getUserEmail();
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    goHome(): void {
      this.router.navigate(['/board']);
    }
}
