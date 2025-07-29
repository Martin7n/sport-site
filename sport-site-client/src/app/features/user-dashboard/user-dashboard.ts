import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexWithImage } from '../../models/complexWithImg';
import { ComplexService } from '../../core/services/complex-service/complex-service';
import { COMPLEX_IMAGES } from '../../core/constants/images';
import { AuthService } from '../../core/services/auth-service/auth.service';


@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
})
export class UserDashboard implements OnInit {
  
  likedData: ComplexWithImage[] = [];
  loading = true;
  error = '';

  constructor(
    private complexService: ComplexService,
    private authService: AuthService
  ) {}

  images = COMPLEX_IMAGES;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to view liked complexes.';
      this.loading = false;
      return;
    }

    this.complexService.getLikedComplexes().subscribe({
      next: (res) => {
        this.likedData = res.map((item) => {
          const index = Math.floor(Math.random() * this.images.length);
          return {
            ...item,
            randomImage: `/images/${this.images[index]}`,
          } as ComplexWithImage;
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load liked complexes';
        this.loading = false;
      },
    });
  }

  scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
