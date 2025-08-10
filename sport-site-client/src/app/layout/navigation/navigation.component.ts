import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']   
})



  export class NavigationComponent {

    showMenu = false;
    constructor(private router: Router, public auth: AuthService) {}

    
    
  //   get isLoggedIn(): boolean | null {
  //   const auth = this.auth;   
  //   return auth.isLoggedInSignal();
  // }

  

  get isLoggedIn(): boolean {
  return !!this.auth.isLoggedInSignal();
}
  

  goToTestApi(): void {
    this.router.navigate(['/workouts']);
  }

   logout() {

    this.auth.logout();
    window.location.href = '/';
    }


    toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }


   @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.showMenu = false;
    }
  }


}