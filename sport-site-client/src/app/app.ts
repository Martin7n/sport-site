import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import {  ComplexLibrarySample } from './features/complexes/complex-library-sample/complex-library-sample';
import { FooterComponent } from './layout/footer/footer.component';
import { Register } from './features/users/register/register';
import { Login } from './features/users/login/login';
import { ActionGrid } from './home/action-grid/action-grid';
import { AuthService } from './core/services/auth-service/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent,
    ActionGrid,
    ComplexLibrarySample,
    Register,
    Login,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('sportsite-v3');

  constructor(private authService: AuthService, private router: Router) {}

  private storageListener = (event: StorageEvent) => {
    if (event.key === 'logout') {
        console.log('[Sync] Logout triggered by another tab');
        sessionStorage.clear();
      //  this.authService.logout();  
      this.router.navigate(['/login']);  
    }
  };

  ngOnInit(): void {
     this.authService.validateSession().subscribe();
    window.addEventListener('storage', this.storageListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageListener);
  }
}
