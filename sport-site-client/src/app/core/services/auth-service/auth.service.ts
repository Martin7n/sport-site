
// src/app/core/services/auth-service/auth.service.ts


import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../enviroments/enviroment';
import {  Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';



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
  // private loggedIn = signal<boolean | null>(null);
  private loggedIn = signal<boolean>(false);
  isLoggedInSignal = this.loggedIn;

  private readonly apiUrl = environment.myApiUrl + '/auth';
  private headers = new HttpHeaders().set('x-api-key', environment.mApiKey);

  constructor(private http: HttpClient, private router: Router) {}

  
  
   validateSession(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      this.clearLocalSessionData();
      this.loggedIn.set(false);
      return of(false);
    }

    return this.http.get<{ valid: boolean }>(
      `${this.apiUrl}/check`,
      { headers: this.headers, withCredentials: true }
    ).pipe(
      tap(() => this.loggedIn.set(true)),
      map(() => true),
      catchError(() => {
        this.clearLocalSessionData();
        this.loggedIn.set(false);
        return of(false);
      })
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      userData,
      { headers: this.headers, withCredentials: true }
    ).pipe(
      tap(res => {this.saveAuthDataToLocal(res.token, res.username);
          this.loggedIn.set(true); 
       })
      
    );
  
  }

  login(userData: { loginId: string; password: string }, rememberMe: boolean): Observable<AuthResponse> {
    const isEmail = userData.loginId.includes('@');
    const payload = isEmail
      ? { email: userData.loginId, password: userData.password }
      : { username: userData.loginId, password: userData.password };

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      payload,
      { headers: this.headers, withCredentials: true }
    ).pipe(
      tap(res => {
                  this.saveAuthDataToLocal(res.token, res.username);
                  this.loggedIn.set(true); 

        // if (rememberMe) {
        //   this.saveAuthDataToLocal(res.token, res.username);
        // } else {
        //   this.saveAuthDataToSession(res.token, res.username);
        // }
        // this.loggedIn.set(true); 
      })
    );
  }

  isLoggedIn(): boolean {
  return !!this.loggedIn();  
}

  logout(): void {
    // this.router.navigate(['/login']);

    //instant state update
    this.clearLocalSessionData();
    this.loggedIn.set(false);

    this.http.get(`${this.apiUrl}/logout`, {
      headers: this.headers,
      withCredentials: true,
    }).subscribe({
      next: () => {
        this.clearLocalSessionData();
        this.loggedIn.set(false);
      },
      error: (err) => {
        console.error('[Logout] Failed to contact backend:', err);
        this.loggedIn.set(false);
      }
    });
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.id;
    } catch (error) {
      console.error('[AuthService] Failed to decode token:', error);
      return null;
    }
  }

  getUsername(): string | null {
    return localStorage.getItem('username') || sessionStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  private saveAuthDataToLocal(token: string, username: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  }

  private saveAuthDataToSession(token: string, username: string): void {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('username', username);
  }

  private clearLocalSessionData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
  }
}