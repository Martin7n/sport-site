import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateSession().pipe(
    take(1),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['/profile']);
        return false;
      }
      return true;
    })
  );
};