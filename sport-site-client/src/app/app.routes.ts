// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { HeroSection } from './home/hero-section/hero-section';
import { Register } from './features/users/register/register';
import { Login } from './features/users/login/login';
import { NewsSection } from './features/news-section/news-section';
import { About } from './features/about/about';
import { ComplexLibrarySample } from './features/complexes/complex-library-sample/complex-library-sample';
import { CreateComplex } from './features/complexes/create-complex/create-complex';
import { GenerateComplex } from './features/complexes/generate-complex/generate-complex';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: HeroSection },   // default route
  { path: 'workouts', component: ComplexLibrarySample }, // workout api route
  { path: 'about', component: About }, 
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {path: 'news', component: NewsSection},
  {path: "create-complex", component: CreateComplex},
  {path: "generate-complex", component: GenerateComplex},
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user-dashboard/user-dashboard').then(
        (m) => m.UserDashboard
      ),
  },
    // { path: 'login', component: RegisterComponent},

  {
  path: 'user-workouts',
  loadComponent: () => import('./features/workout-list/workout-list').then(m => m.WorkoutListComponent)
},


  { path: '**', redirectTo: '', pathMatch: 'full' }
];
