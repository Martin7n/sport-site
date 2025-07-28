import { Component, OnInit } from '@angular/core';
import { ComplexService } from '../../../core/services/complex-service/complex-service';
import { Complex } from '../../../models/complex.model';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-generate-complex',
  templateUrl: './generate-complex.html',
  styleUrls: ['./generate-complex.css'],
  imports: [CommonModule]
})
export class GenerateComplex implements OnInit {
  generatedComplex?: Complex;
  loading = false;
  error = '';

  constructor(private complexService: ComplexService) {}

  ngOnInit(): void {
    this.loadGeneratedComplex();
  }

  loadGeneratedComplex(): void {
    this.loading = true;
    this.error = '';

    this.complexService.generateComplex().subscribe({
      next: (res) => {
        this.generatedComplex = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to generate complex.';
        this.loading = false;
      },
    });
  }

     addToFavorites() {
    if (!this.generatedComplex) {
      return;
    }

    // For now, just console log or show alert - later replace with API call
    console.log('Adding to favorites:', this.generatedComplex._id);
    alert(`Added complex "${this.generatedComplex.type}" to favorites!`);

    // TODO: call a service method to save favorite for the user
  }
}
