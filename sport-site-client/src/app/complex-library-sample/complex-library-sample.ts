import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexService } from '../core/services/complex-service/complex-service';

@Component({
  selector: 'complex-library-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complex-library-sample.html',
  styleUrls: ['./complex-library-sample.css']
})
export class ComplexLibrarySample implements OnInit {
  data: any;
  loading = true;
  error = '';

  constructor(private myDataService: ComplexService) {}

  images = [
  'work-1.jpg',
  'work-12.jpg',
  'work-2.jpg',
  'work1 (1).jpg',
  'work1 (10).jpg',
  'work1 (11).jpg',
  'work1 (12).jpg',
  'work1 (13).jpg',
  'work1 (14).jpg',
  'work1 (15).jpg',
  'work1 (16).jpg',
  'work1 (17).jpg',
  'work1 (18).jpg',
  'work1 (2).jpg',
  'work1 (3).jpg',
  'work1 (4).jpg',
  'work1 (5).jpg',
  'work1 (6).jpg',
  'work1 (7).jpg',
  'work1 (8).jpg',
  'work1 (9).jpg',
];

ngOnInit(): void {
  this.myDataService.getData().subscribe({
    next: (res) => {
      // assign data first
      this.data = res;

      // add randomImage property to each item
      this.data.forEach((item: any) => {
        const index = Math.floor(Math.random() * this.images.length);
        item.randomImage = `/images/${this.images[index]}`;
      });

      this.loading = false;
    },
    error: (err) => {
      this.error = 'Error loading data';
      this.loading = false;
    }
  });}
}

//   ngOnInit(): void {
//     this.myDataService.getData().subscribe({
//       next: (res) => {
//         this.data = res;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Error loading data';
//         this.loading = false;
//       }
//     });
//   }
