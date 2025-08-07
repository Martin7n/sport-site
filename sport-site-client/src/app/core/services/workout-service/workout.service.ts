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
    return this.http.get<Workout>(url, { headers: this.headers });
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
    const url = `${this.baseUrl}/userworkout`;
    return this.http.post<Workout>(url, payload, { headers: this.headers });
  }
}
