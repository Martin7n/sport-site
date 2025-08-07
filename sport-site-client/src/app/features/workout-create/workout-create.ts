// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
// import { WorkoutService } from '../../core/services/workout-service/workout.service';
// import { ReactiveFormsModule } from '@angular/forms';  
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../core/services/auth-service/auth.service';

// @Component({
//   selector: 'app-workout-create',
//   templateUrl: './workout-create.html',
//   styleUrls: ['./workout-create.css'],
//   imports: [ReactiveFormsModule, CommonModule]
// })
// export class WorkoutCreateComponent implements OnInit {
//   workoutForm!: FormGroup;
//   exercisesList: { _id: string; name: string }[] = [];

//   constructor(
//     private fb: FormBuilder, 
//     private workoutService: WorkoutService,  
//     private authService: AuthService
//     ) {}

//   // ngOnInit() {
//   //   this.workoutForm = this.fb.group({
//   //     type: ['', Validators.required],
//   //     exercises: this.fb.array([]),
//   //     owner: [''], // fill or leave empty as needed
//   //   });

//   //   this.workoutService.getExercises().subscribe(data => {
//   //     this.exercisesList = data;
//   //   });
//   // }

//   ngOnInit() {
//   const userId = this.authService.getUserId();

//   this.workoutForm = this.fb.group({
//     type: ['', Validators.required],
//     exercises: this.fb.array([]),
//     owner: [userId],  
//   });

//   this.workoutService.getExercises().subscribe(data => {
//     this.exercisesList = data;
//   });
// }

//   get exercises(): FormArray {
//     return this.workoutForm.get('exercises') as FormArray;
//   }

//   getSets(form: AbstractControl | null): FormArray {
//   return form instanceof FormArray ? form : this.fb.array([]);
// }

//   addExercise(exerciseId: string) {
//     const exercise = this.exercisesList.find(e => e._id === exerciseId);
//     if (!exercise) return;

//     // Avoid duplicate exercises
//     if (this.exercises.controls.some(ctrl => ctrl.value.exercise === exerciseId)) {
//       alert('Exercise already added!');
//       return;
//     }

//     this.exercises.push(this.fb.group({
//       exercise: [exercise._id, Validators.required],
//       name: [exercise.name],
//       sets: this.fb.array([this.createSet()])
//     }));
//   }

//   createSet(): FormGroup {
//     return this.fb.group({
//       reps: [null, [Validators.required, Validators.min(1)]],
//       weight: [null, [Validators.min(0)]],
//     });
//   }

//   addSet(exerciseIndex: number) {
//     (this.exercises.at(exerciseIndex).get('sets') as FormArray).push(this.createSet());
//   }

//   removeSet(exerciseIndex: number, setIndex: number) {
//     (this.exercises.at(exerciseIndex).get('sets') as FormArray).removeAt(setIndex);
//   }

//   removeExercise(index: number) {
//     this.exercises.removeAt(index);
//   }

//   submit() {
//     if (this.workoutForm.invalid) {
//       this.workoutForm.markAllAsTouched();
//       return;
//     }

//     const payload = this.workoutForm.value;
//     this.workoutService.createWorkout(payload).subscribe({
//       next: workout => {
//         console.log('Workout created:', workout);
//         // Maybe navigate away or reset form here
//       },
//       error: err => {
//         console.error('Create workout error:', err);
//       }
//     });
//   }

//   getSetsControlArray(exCtrl: AbstractControl): FormArray {
//   return exCtrl.get('sets') as FormArray;
// }


// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { WorkoutService } from '../../core/services/workout-service/workout.service';
import { ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.html',
  styleUrls: ['./workout-create.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class WorkoutCreateComponent implements OnInit {
  workoutForm!: FormGroup;
  exercisesList: { _id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder, 
    private workoutService: WorkoutService,  
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      type: ['', Validators.required],
      exercises: this.fb.array([]),
      owner: ['']  // will be patched during submit
    });

    this.workoutService.getExercises().subscribe(data => {
      this.exercisesList = data;
    });
  }

  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  getSets(form: AbstractControl | null): FormArray {
    return form instanceof FormArray ? form : this.fb.array([]);
  }

  addExercise(exerciseId: string) {
    const exercise = this.exercisesList.find(e => e._id === exerciseId);
    if (!exercise) return;

    // Avoid duplicate exercises
    if (this.exercises.controls.some(ctrl => ctrl.value.exercise === exerciseId)) {
      alert('Exercise already added!');
      return;
    }

    this.exercises.push(this.fb.group({
      exercise: [exercise._id, Validators.required],
      name: [exercise.name],
      sets: this.fb.array([this.createSet()])
    }));
  }

  createSet(): FormGroup {
    return this.fb.group({
      reps: [null, [Validators.required, Validators.min(1)]],
      weight: [null, [Validators.min(0)]],
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

  getSetsControlArray(exCtrl: AbstractControl): FormArray {
    return exCtrl.get('sets') as FormArray;
  }

  submit() {
    if (this.workoutForm.invalid) {
      this.workoutForm.markAllAsTouched();
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No user ID found. Please make sure you are logged in.');
      return;
    }

    // Patch owner into the form before submission
    this.workoutForm.patchValue({ owner: userId });

    const payload = this.workoutForm.value;

    this.workoutService.createWorkout(payload).subscribe({
      next: workout => {
        console.log('Workout created:', workout);
        // Optionally reset form or navigate
      },
      error: err => {
        console.error('Create workout error:', err);
      }
    });
  }
}

