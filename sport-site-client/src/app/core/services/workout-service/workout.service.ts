import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../../../models/workout.model';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private baseUrl = environment.myApiUrl;
  private headers = new HttpHeaders().set('x-api-key', environment.mApiKey);

  constructor(private http: HttpClient) {}

  getWorkout(id: string): Observable<Workout> {
    const url = `${this.baseUrl}/userworkout/${id}`;
    return this.http.get<Workout>(url, { headers: this.headers, withCredentials: true });
  }


  updateWorkout(id: string, payload: Partial<Workout>): Observable<Workout> {
    const url = `${this.baseUrl}/userworkout/${id}`;
    return this.http.patch<Workout>(url, payload, { headers: this.headers });
  }

  getAllWorkouts(): Observable<Workout[]> {
    const url = `${this.baseUrl}/userworkout`;
    console.log(`getALL@ ${url}`)
    return this.http.get<Workout[]>(url, { headers: this.headers });
  }

  createWorkout(payload: Workout): Observable<Workout> {
    const url = `${this.baseUrl}/userworkout/create`;
    return this.http.post<Workout>(url, payload, { headers: this.headers });
  }

  getExercises(): Observable<{ _id: string; name: string }[]> {
  return this.http.get<{ _id: string; name: string }[]>(`${this.baseUrl}/userworkout/exercise`, { headers: this.headers });
}

  deleteWorkout(id: string): Observable<any> {
  const url = `${this.baseUrl}/userworkout/del/${id}`;
  return this.http.get(url, { headers: this.headers });
}

}
