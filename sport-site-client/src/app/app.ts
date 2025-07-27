import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import {  WorkoutApiComponent } from './workout-api/workout-api.component';
import { FooterComponent } from './footer/footer.component';
import {  MainContentComponent } from './main-content/main-content';
import { RegisterComponent } from './register-component/register-component';
import { LoginComponent } from './login-component/login-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
           NavigationComponent, 
           FooterComponent, 
           MainContentComponent,
           WorkoutApiComponent,
          RegisterComponent,
        LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('sportsite-v2');
}
