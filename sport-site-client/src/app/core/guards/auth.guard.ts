import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { catchError, of, switchMap } from 'rxjs';

// export const authGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (!authService.isLoggedIn()) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return of(false);
  }

  return authService.validateSession().pipe(
    switchMap((isValid) => {
      if (!isValid) {
        router.navigate(['/login']);
        return of(false);
      }
      return of(true);
    }),
    catchError((err) => {
      console.error('[authGuard] Session validation failed:', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};