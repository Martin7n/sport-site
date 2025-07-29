import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import { Complex } from '../../../models/complex.model';
import { ComplexWithImage } from '../../../models/complexWithImg';



@Injectable({
  providedIn: 'root'
})

export class ComplexService {
  private baseUrl  = environment.myApiUrl;
  private headers = new HttpHeaders().set('x-api-key', environment.mApiKey);


  constructor(private http: HttpClient) {}

  // getData(): Observable<Complex[]> {  
    
  //   const endpoint = 'wo/read-complexes';
  //   const url = this.baseUrl + endpoint;
   
  //   return this.http.get(url, { headers: this.headers });

  // }

  getData(): Observable<Complex[]> {

  const endpoint = '/wo/read-complexes';
  const url = this.baseUrl + endpoint;
  console.log('API key sent:', environment.mApiKey);


  return this.http.get<Complex[]>(url, { headers: this.headers });
}


  // getComplexDetails(id: string): Observable<Complex[]> {

  //   const endpoint = '/wo/read-complexes'
  //   const url = this.baseUrl + endpoint;
    
  //   return this.http.get<Complex[]>(url, { headers: this.headers });
  //  }

  // createComplex(payload: any): Observable<Complex> {
  //   const endpoint = '/wo/read-complexes'
  //   const url = this.baseUrl + endpoint;
  //   return this.http.post<Complex>(url, payload, { headers: this.headers });
  //  }



   toggleLike(complexId: string): Observable<{ likedByUser: boolean; likeCount: number }> {
   const url = `${this.baseUrl}/wo/complexes/toggle-like/${complexId}`;
    const headers = new HttpHeaders().set('x-api-key', environment.mApiKey);

  return this.http.post<{ likedByUser: boolean; likeCount: number }>(
    url,
    null,
    {
      headers,
      withCredentials: true
    }
  );
}

  getLikedComplexes(): Observable<ComplexWithImage[]> {
  const endpoint = '/wo/profile';
  const headers = new HttpHeaders().set('x-api-key', environment.mApiKey);

  const url = this.baseUrl + endpoint;
  return this.http.get<ComplexWithImage[]>(url,  {
      headers,
      withCredentials: true
    });
}


  generateComplex(): Observable<Complex> {

    const endpoint = '/wo/create-complex';
    const url = this.baseUrl + endpoint;

    return this.http.get<Complex>(url, { 
      headers: this.headers,  withCredentials: true 
    });
  }

} 
