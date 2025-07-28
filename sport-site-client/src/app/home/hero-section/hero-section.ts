import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionGrid } from '../action-grid/action-grid';


@Component({
  selector: 'hero-section',
  standalone: true,
  imports: [ActionGrid ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {
  constructor(private router: Router) {}

  goToTestApi(): void {
    this.router.navigate(['/workouts']);
  }

}
