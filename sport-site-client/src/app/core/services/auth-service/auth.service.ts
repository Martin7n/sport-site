
// src/app/core/services/auth-service/auth.service.ts


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../enviroments/enviroment';

// export interface AuthResponse {
//   token: string;
//   username: string;
//   email: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly apiUrl = environment.myApiUrl + 'auth';

//   constructor(private http: HttpClient) {}

//   register(userData: any): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
//       tap((res) => {
//         this.saveAuthData(res.token, res.username);
//       })
//     );
//   }

//   login(userData: any): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
//       tap((res) => {
//         this.saveAuthData(res.token, res.username);
//       })
//     );
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('authToken');
//   }

//   getUsername(): string | null {
//     return localStorage.getItem('username');
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('username');
//   }

//   private saveAuthData(token: string, username: string) {
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('username', username);
//   }
// }



export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.myApiUrl + '/auth';
  private headers = new HttpHeaders().set('x-api-key', environment.mApiKey);


  constructor(private http: HttpClient) {}

  register(userData: any): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${this.apiUrl}/register`,
    userData,
    { headers: this.headers, withCredentials: true }
  ).pipe(
    tap(res => this.saveAuthDataToLocal(res.token, res.username))
  );
}

  login(
  userData: { loginId: string; password: string },
  rememberMe: boolean
): Observable<AuthResponse> {
  const isEmail = userData.loginId.includes('@');

  const payload = isEmail
    ? { email: userData.loginId, password: userData.password }
    : { username: userData.loginId, password: userData.password };

  return this.http.post<AuthResponse>(
    `${this.apiUrl}/login`,
    payload,
    { headers: this.headers, withCredentials: true }
  ).pipe(
    tap((res) => {
      if (rememberMe) {
        this.saveAuthDataToLocal(res.token, res.username);
      } else {
        this.saveAuthDataToSession(res.token, res.username);
      }

      // Set cookie manually
      const cookieName = 'authToken';
      const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);  
      document.cookie = `${cookieName}=${res.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    })
  );
}

  isLoggedIn(): boolean {
    return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
  }

  getUsername(): string | null {
    return localStorage.getItem('username') || sessionStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');

     localStorage.setItem('logout', Date.now().toString());
    localStorage.removeItem('logout');  
  }

  private saveAuthDataToLocal(token: string, username: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  }

  private saveAuthDataToSession(token: string, username: string) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('username', username);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }
}
