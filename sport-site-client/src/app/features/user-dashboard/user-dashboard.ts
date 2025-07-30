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

  selectedTab: 'liked' | 'created' | 'generate' = 'liked';
  likedData: ComplexWithImage[] = [];
  generatedComplex: ComplexWithImage | null = null;

  loading = false;
  error = '';
  images = COMPLEX_IMAGES;

  constructor(
    private complexService: ComplexService,
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to view your dashboard.';
      return;
    }

    this.loadTabData(this.selectedTab);
  }

  selectTab(tab: 'liked' | 'created' | 'generate'): void {
    this.loadTabData(tab);
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
          this.likedData = res.map(item => {
            const index = Math.floor(Math.random() * this.images.length);
            return { ...item, randomImage: `/images/${this.images[index]}` } as ComplexWithImage;
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load liked complexes.';
          alert(`Try loggin in: \n${this.error}`)

          this.loading = false;
          window.location.href = '/';
        }
      });
    } else if (tab === 'generate') {

      
      this.loading = true;
      this.error = '';
      this.generatedComplex = null;
      this.complexService.generateComplex().subscribe({
        next: (complex) => {
          const index = Math.floor(Math.random() * this.images.length);
          this.generatedComplex = {
            ...complex,
            randomImage: `/images/${this.images[index]}`
          } as ComplexWithImage;
          this.loading = false;
        },
        error: () => {
           console.log(this.authService.isLoggedIn)

           
          this.error = 'Failed to load liked complexes.';
          alert(`Try loggin in: \n${this.error}`)

          this.loading = false;
          window.location.href = '/';
        }
      });
    }
  }

  removeFromLiked(complex: ComplexWithImage): void {
    this.complexService.toggleLike(complex._id).subscribe({
      next: () => {
        this.likedData = this.likedData.filter(c => c._id !== complex._id);
      },
      error: (err) => {
        console.error('Failed to remove from liked list', err);
      }
    });
  }

  generateNewComplex(): void {
    this.loading = true;
    this.error = '';
    this.complexService.generateComplex().subscribe({
      next: (complex) => {
        const index = Math.floor(Math.random() * this.images.length);
        this.generatedComplex = {
          ...complex,
          randomImage: `/images/${this.images[index]}`
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to generate complex.';
        this.loading = false;
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
