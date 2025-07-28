import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import {  ComplexLibrarySample } from './complex-library-sample/complex-library-sample';
import { FooterComponent } from './layout/footer/footer.component';
import { RegisterComponent } from './features/register-component/register-component';
import { LoginComponent } from './features/login-component/login-component';
import { ActionGrid } from './home/action-grid/action-grid';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
           NavigationComponent, 
           FooterComponent, 
           ActionGrid,
           ComplexLibrarySample,
           RegisterComponent,
           LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('sportsite-v2');
}
