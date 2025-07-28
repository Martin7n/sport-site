// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { HeroSection } from './home/hero-section/hero-section';
import { RegisterComponent } from './features/register-component/register-component';
import { LoginComponent } from './features/login-component/login-component';
import { NewsComponent } from './features/news-component/news-component';
import { About } from './features/about/about';
import { ComplexLibrarySample } from './complex-library-sample/complex-library-sample';
import { CreateComplex } from './features/create-complex/create-complex';

export const routes: Routes = [
  { path: '', component: HeroSection },   // default route
  { path: 'workouts', component: ComplexLibrarySample }, // workout api route
  { path: 'about', component: About }, 
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  {path: 'news', component: NewsComponent},
  {path: "create-complex", component: CreateComplex},
    // { path: 'login', component: RegisterComponent},

  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
