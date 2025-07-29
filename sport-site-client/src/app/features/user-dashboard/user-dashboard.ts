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
  
//   likedData: ComplexWithImage[] = [];
//   loading = true;
//   error = '';

//   constructor(
//     private complexService: ComplexService,
//     private authService: AuthService
//   ) {}

//   images = COMPLEX_IMAGES;

//   get isLoggedIn(): boolean {
//     return this.authService.isLoggedIn();
//   }

//   ngOnInit(): void {
//     if (!this.isLoggedIn) {
//       this.error = 'You must be logged in to view liked complexes.';
//       this.loading = false;
//       return;
//     }

//     this.complexService.getLikedComplexes().subscribe({
//       next: (res) => {
//         this.likedData = res.map((item) => {
//           const index = Math.floor(Math.random() * this.images.length);
//           return {
//             ...item,
//             randomImage: `/images/${this.images[index]}`,
//           } as ComplexWithImage;
//         });
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Failed to load liked complexes';
//         this.loading = false;
//       },
//     });
//   }

//   scrollToTop(): void {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }
// }

 selectedTab: 'liked' | 'created' | 'generate' = 'liked';

  likedData: ComplexWithImage[] = [];
  loading = false;
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
      this.error = 'You must be logged in to view your dashboard.';
      return;
    }

    // Load default tab
    this.loadTabData(this.selectedTab);
  }

  selectTab(tab: 'liked' | 'created' | 'generate'): void {
    this.selectedTab = tab;
  }

  loadTabData(tab: 'liked' | 'created' | 'generate') {
    this.selectedTab = tab;

    if (tab === 'liked') {
      this.loading = true;
      this.error = '';
      this.complexService.getLikedComplexes().subscribe({
        next: (res) => {
          if (!Array.isArray(res)) {
            this.error = 'Unexpected data received';
            this.loading = false;
            return;
          }

          this.likedData = res.map((item) => {
            const index = Math.floor(Math.random() * this.images.length);
            return {
              ...item,
              randomImage: `/images/${this.images[index]}`
            } as ComplexWithImage;
          });

          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load liked complexes.';
          this.loading = false;
        }
      });
    }

    // Later: handle 'created' and 'generate' logic if needed
  }

  removeFromLiked(complex: ComplexWithImage): void {
  this.complexService.toggleLike(complex._id).subscribe({
    next: (res) => {
      // Remove the complex from likedData locally
      this.likedData = this.likedData.filter(c => c._id !== complex._id);
    },
    error: (err) => {
      console.error('Failed to remove from liked list', err);
    }
  });
}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}