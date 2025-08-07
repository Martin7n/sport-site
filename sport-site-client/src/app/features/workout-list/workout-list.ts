import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../core/services/workout-service/workout.service';
import { Workout } from '../../models/workout.model';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../pipes/capitalize/capitalize-pipe';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizePipe],
  templateUrl: './workout-list.html',
  styleUrls: ['./workout-list.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  loading = true;
  error = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (data) => {
        this.workouts = data;
        console.log(this.workouts)
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load workouts.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDeleteWorkout(id: string | undefined) {
  if (!id) return;
  if (confirm('Are you sure you want to delete this workout?')) {
    // TODO: Connect to workoutService.deleteWorkout(id)
    console.log('Deleting workout:', id);
  }
}

onAddToRoutine(workout: Workout) {
  // TODO: Implement logic when routine feature is ready
  console.log('Add to routine:', workout);
}
}
