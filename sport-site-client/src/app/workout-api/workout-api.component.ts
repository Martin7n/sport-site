import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataService } from '../core/services/my-data-service/my-data.service';

@Component({
  selector: 'workout-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-api.component.html',
  styleUrls: ['./workout-api.component.css']
})
export class WorkoutApiComponent implements OnInit {
  data: any;
  loading = true;
  error = '';

  constructor(private myDataService: MyDataService) {}

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
