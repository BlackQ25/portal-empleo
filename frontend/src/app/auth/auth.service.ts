// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  setLogin(email: string): void {
    localStorage.setItem('userEmail', email);
  }

  logout(): void {
    localStorage.removeItem('userEmail');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}
