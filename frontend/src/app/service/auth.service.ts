import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'userEmail';

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email;
  }

  setLogin(email: string): void {
    localStorage.setItem(this.storageKey, email);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUserEmail(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || null;
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null;
  }
}
