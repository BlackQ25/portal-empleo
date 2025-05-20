import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'userEmail';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  setLogin(email: string): void {
    localStorage.setItem(this.storageKey, email);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}
