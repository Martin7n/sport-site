import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainContentComponent } from '../main-content/main-content';


@Component({
  selector: 'home-section-component',
  standalone: true,
  imports: [MainContentComponent ],
  templateUrl: './home-section-component.html',
  styleUrl: './home-section-component.css'
})
export class HomeSectionComponent {
  constructor(private router: Router) {}

  goToTestApi(): void {
    this.router.navigate(['/workouts']);
  }

}
