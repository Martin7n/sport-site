

export interface Set {
  reps: number;
  weight?: number;
}

export interface WorkoutExercise {
  exercise: string; 
  name: string;  
  sets: Set[];
}

export interface Workout {
  _id?: string;
  type: string;
  exercises: WorkoutExercise[];
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}
