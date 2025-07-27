import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // or however you track auth
  }

  getUsername(): string | null {
    return localStorage.getItem('username'); // optional, for display
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    // Add other cleanup as needed
  }
}
