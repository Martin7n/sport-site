// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { HomeSectionComponent } from './home-section-component/home-section-component';
import { WorkoutApiComponent } from './workout-api/workout-api.component';
import { About } from './about/about';
import { RegisterComponent } from './register-component/register-component';
import { LoginComponent } from './login-component/login-component';
import { NewsComponent } from './news-component/news-component';

export const routes: Routes = [
  { path: '', component: HomeSectionComponent },   // default route
  { path: 'workouts', component: WorkoutApiComponent }, // workout api route
  { path: 'about', component: About }, 
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  {path: 'news', component: NewsComponent},
    // { path: 'login', component: RegisterComponent},

  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
