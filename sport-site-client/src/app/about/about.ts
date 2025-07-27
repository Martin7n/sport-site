import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {

   constructor(private router: Router) {}

  goToTestApi(): void {
    this.router.navigate(['/workouts']);
  }

  

}
