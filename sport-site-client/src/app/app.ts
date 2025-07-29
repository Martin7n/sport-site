import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import {  ComplexLibrarySample } from './features/complexes/complex-library-sample/complex-library-sample';
import { FooterComponent } from './layout/footer/footer.component';
import { Register } from './features/users/register/register';
import { Login } from './features/users/login/login';
import { ActionGrid } from './home/action-grid/action-grid';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
           NavigationComponent, 
           FooterComponent, 
           ActionGrid,
           ComplexLibrarySample,
           Register,
           Login],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('sportsite-v3');
}
