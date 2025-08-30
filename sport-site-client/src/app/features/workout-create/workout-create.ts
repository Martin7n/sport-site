import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth-service/auth.service";
import { WorkoutService } from "../../core/services/workout-service/workout.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";



@Component({
  selector: 'app-workout-create',
  standalone: true,
  templateUrl: './workout-create.html',
  styleUrls: ['./workout-create.css'],
  imports: [ReactiveFormsModule, CommonModule]
})


export class WorkoutCreateComponent implements OnInit {
  workoutForm!: FormGroup;
  exercisesList: { _id: string; name: string }[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      type: ['', Validators.required],
      exercises: this.fb.array([])
    });

    this.workoutService.getExercises().subscribe(data => {
      this.exercisesList = data;

      this.addExerciseForm();
    });
  }

  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  createSet(): FormGroup {
    return this.fb.group({
      reps: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      weight: [null, [Validators.required, Validators.min(1), this.weightValidator]]
    });
  }

  weightValidator(control: AbstractControl) {
    const value = control.value;
    if (value == null) return null;
    return value * 2 === Math.round(value * 2) ? null : { invalidWeight: true };
  }

  addExerciseForm() {
    const exForm = this.fb.group({
      exercise: [null, Validators.required],
      name: [''],
      sets: this.fb.array([this.createSet()])
    });
    this.exercises.push(exForm);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addSet(exIndex: number) {
    this.getSetsControlArray(this.exercises.at(exIndex)).push(this.createSet());
  }

  removeSet(exIndex: number, setIndex: number) {
    const sets = this.getSetsControlArray(this.exercises.at(exIndex));
    sets.removeAt(setIndex);
  }

  getSetsControlArray(exCtrl: AbstractControl): FormArray {
    return exCtrl.get('sets') as FormArray;
  }

  onExerciseSelect(index: number, exerciseId: string) {
    const exercise = this.exercisesList.find(e => e._id === exerciseId);
    if (exercise) {
      const exCtrl = this.exercises.at(index);
      exCtrl.patchValue({ name: exercise.name });
    }
  }

  submit() {
  if (this.workoutForm.invalid || this.exercises.length === 0) {
    this.workoutForm.markAllAsTouched();
    return;
  }

  const userId = this.authService.getUserId();
  if (!userId) {
    console.error('No user ID found.');
    return;
  }

  const payload = {
    ...this.workoutForm.value,
    owner: userId
  };

  this.workoutService.createWorkout(payload).subscribe({
    next: (workout) => {
      console.log('Workout created:', workout);

      this.successMessage = 'Workout created successfully!';

      // Show message, then redirect after 3 seconds
      // setTimeout(() => {
      //   this.router.navigate(['/user-workouts']);
      // }, 3000);
      this.router.navigate(['/user-workouts']);

      this.workoutForm.reset();
      this.exercises.clear();
      this.addExerciseForm();  // reset with one blank form
    },
    error: (err) => {
      console.error('Workout creation failed:', err);
      this.errorMessage = 'Failed to create workout. Try again.';
    }
  });
}
}

