import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../core/services/workout-service/workout.service';
import { Workout } from '../../models/workout.model';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../pipes/capitalize/capitalize-pipe';
import { Router } from '@angular/router';  // <-- import Router

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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private workoutService: WorkoutService, private router: Router) {}

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


 onEditWorkout(workout: Workout) {
     if (!workout._id) return;
    this.router.navigate(['/user-workouts', workout._id, 'edit']);
  }

onDeleteWorkout(id: string | undefined): void {
  if (!id) return;

  const confirmed = confirm('Are you sure you want to delete this workout?');
  if (!confirmed) return;

  this.workoutService.deleteWorkout(id).subscribe({
    next: () => {
       this.successMessage = 'Workout deleted successfully.';
      this.workouts = this.workouts.filter(w => w._id !== id);

      setTimeout(() => {
        this.successMessage = '';
      }, 1000);
    },
    error: (err) => {
      console.error('Delete error:', err);
      this.errorMessage = 'Failed to delete workout.';
    }
  });
}

onAddToRoutine(workout: Workout) {
  // TODO: Implement logic when routine feature is ready
  console.log('Add to routine:', workout);
}
}
 