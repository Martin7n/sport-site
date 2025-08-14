import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../../models/workout.model';
import { WorkoutService } from '../../core/services/workout-service/workout.service';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-edit.html',
  styleUrls: ['./workout-edit.css'],
})
export class WorkoutEditComponent implements OnInit {
  workoutForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  workoutId!: string;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.workoutId) {
      this.errorMessage = 'Invalid workout ID.';
      return;
    }

    this.loading = true;

    this.workoutService.getWorkout(this.workoutId).subscribe({
      next: (workout) => {
        this.buildForm(workout);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load workout.';
        this.loading = false;
      },
    });
  }

  buildForm(workout: Workout) {
    this.workoutForm = this.fb.group({
      type: [workout.type, Validators.required],
      exercises: this.fb.array(
        workout.exercises.map((ex) => this.createExerciseGroup(ex))
      ),
    });
  }

  createExerciseGroup(exercise: any): FormGroup {
    return this.fb.group({
      exercise: [exercise.exercise, Validators.required],
      name: [exercise.name],
      sets: this.fb.array(
        exercise.sets.map((set: any) =>
          this.fb.group({
            reps: [set.reps, [Validators.required, Validators.min(1), Validators.max(20)]],
            weight: [set.weight, [Validators.required, Validators.min(1), this.weightValidator]],
          })
        )
      ),
    });
  }

  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  getSets(exerciseIndex: number): FormArray {
    return this.exercises.at(exerciseIndex).get('sets') as FormArray;
  }

  weightValidator(control: any) {
    const value = control.value;
    return value * 2 === Math.round(value * 2) ? null : { invalidWeight: true };
  }

  submit() {
    if (this.workoutForm.invalid) {
      this.workoutForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const updatedPayload: Partial<Workout> = this.workoutForm.value;

    this.workoutService.updateWorkout(this.workoutId, updatedPayload).subscribe({
      next: () => {
        this.successMessage = 'Workout updated successfully. Redirecting...';
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/user-workouts']);
        }, 5000);
      },
      error: () => {
        this.errorMessage = 'Failed to update workout.';
        this.loading = false;
      },
    });
  }
}
