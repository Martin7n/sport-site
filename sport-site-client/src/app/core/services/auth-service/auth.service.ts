
// src/app/core/services/auth-service/auth.service.ts


import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../enviroments/enviroment';
import {  Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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

interface JwtPayload {
  id: string;
  username: string;
  email?: string;
  // add any fields your backend includes in the token
}


export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedIn = signal<boolean>(this.checkLoggedIn());
    isLoggedInSignal = this.loggedIn;

  private readonly apiUrl = environment.myApiUrl + '/auth';
  private headers = new HttpHeaders().set('x-api-key', environment.mApiKey);


  constructor(private http: HttpClient, private router: Router ) {}

  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

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
        this.saveAuthDataToLocal(res.token, res.username);

        this.saveAuthDataToSession(res.token, res.username);
      }

      // Set cookie manually
      // const cookieName = 'authToken';
      // const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);  
      // document.cookie = `${cookieName}=${res.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    })
  );
}

  isLoggedIn(): boolean {
    return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
  }

  getUsername(): string | null {
    return localStorage.getItem('username') || sessionStorage.getItem('username');
  }

  getUserId(): string | null {
  const token = this.getToken();
  console.log(token)
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.id;
  } catch (error) {
    console.error('[AuthService] Failed to decode token:', error);
    return null;
  }
}

  logout(): void {
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('username');
    // sessionStorage.removeItem('authToken');
    // sessionStorage.removeItem('username');

    // localStorage.setItem('logout', Date.now().toString());
    // localStorage.removeItem('logout');

    
    //    this.router.navigate(['/login']).then(() => {
    // console.log('Navigated to login');});
     this.router.navigate(['/login'])

     this.http.get(`${this.apiUrl}/logout`, {
      headers: this.headers,
      withCredentials: true,
      }).subscribe({
        next: () => {
          this.clearLocalSessionData();
        },
        error: (err) => {
          console.error('[Logout] Failed to contact backend:', err);
        }
  });
  
  }

  private clearLocalSessionData(): void {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('username');
}

  private saveAuthDataToLocal(token: string, username: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  }

  private saveAuthDataToSession(token: string, username: string) {
    // sessionStorage.setItem('authToken', token);
    // sessionStorage.setItem('username', username);
  }

  getToken(): string | null {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}
}
