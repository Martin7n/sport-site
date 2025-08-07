import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../core/services/workout-service/workout.service';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.html'
})
export class WorkoutCreateComponent implements OnInit {
  workoutForm: FormGroup;
  exercisesList: any[] = []; // your list from backend

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      type: ['', Validators.required],
      exercises: this.fb.array([]),
      owner: [''] // or get from auth service
    });

    this.loadExercises();
  }

  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  loadExercises() {
    // You need to implement this in workoutService or another service
    this.workoutService.getExercises().subscribe(data => {
      this.exercisesList = data;
    });
  }

  addExercise(exerciseId: string) {
    const exercise = this.exercisesList.find(e => e._id === exerciseId);
    if (!exercise) return;

    this.exercises.push(this.fb.group({
      exercise: [exercise._id, Validators.required],
      name: [exercise.name],
      sets: this.fb.array([
        this.createSet()
      ])
    }));
  }

  createSet(): FormGroup {
    return this.fb.group({
      reps: [0, [Validators.required, Validators.min(1)]],
      weight: [0, Validators.min(0)]
    });
  }

  addSet(exerciseIndex: number) {
    (this.exercises.at(exerciseIndex).get('sets') as FormArray).push(this.createSet());
  }

  removeSet(exerciseIndex: number, setIndex: number) {
    (this.exercises.at(exerciseIndex).get('sets') as FormArray).removeAt(setIndex);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  submit() {
    if (this.workoutForm.invalid) return;

    const payload = this.workoutForm.value;
    this.workoutService.createWorkout(payload).subscribe({
      next: workout => {
        console.log('Workout created:', workout);
        // navigate or reset form
      },
      error: err => {
        console.error('Create workout error:', err);
      }
    });
  }
}
