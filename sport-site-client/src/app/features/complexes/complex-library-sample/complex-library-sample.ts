import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexService } from '../../../core/services/complex-service/complex-service';
import { Complex } from '../../../models/complex.model';
import { ComplexWithImage } from '../../../models/complexWithImg';
import { COMPLEX_IMAGES } from '../../../core/constants/images';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'complex-library-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complex-library-sample.html',
  styleUrls: ['./complex-library-sample.css']
})
export class ComplexLibrarySample implements OnInit {
    
  data: ComplexWithImage[] = [];


  loading = true;
  error = '';

  constructor(private myDataService: ComplexService,
    private authService: AuthService
  ) {}

  images = COMPLEX_IMAGES;
   get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }



ngOnInit(): void {
  this.myDataService.getData().subscribe({
    next: (res) => {
      // transform Complex[] into ComplexWithImage[]
      this.data = res.map((item) => {
        const index = Math.floor(Math.random() * this.images.length);
        return {
          ...item,
          randomImage: `/images/${this.images[index]}`
        } as ComplexWithImage;
      });

      this.loading = false;
    },
    error: (err) => {
      this.error = 'Error loading data';
      this.loading = false;
    }
  });
}

  toggleLike(complex: ComplexWithImage): void {
    this.myDataService.toggleLike(complex._id).subscribe({
      next: (res) => {
        complex.likedByUser = res.likedByUser;
        complex.likeCount = res.likeCount;
      },
      error: (err) => {
        console.error('Failed to toggle like', err);
      }
    });
  }
}

