import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import { Complex } from '../../../models/complex.model';



@Injectable({
  providedIn: 'root'
})
// export class MyDataService {

  

//     private myApiUrl = environment.myApiUrl + "wo/read-complexes";  


//    constructor(private http: HttpClient) {}

//     getData(): Observable<any> {
//     return this.http.get(this.myApiUrl);
//   }
// }


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

  const endpoint = 'wo/read-complexes';
  const url = this.baseUrl + endpoint;

  return this.http.get<Complex[]>(url, { headers: this.headers });
}

  getComplexDetails(id: string): Observable<Complex[]> {

    const endpoint = 'wo/read-complexes'
    const url = this.baseUrl + endpoint;
    
    return this.http.get<Complex[]>(url, { headers: this.headers });
       // !!!TODO after enhancement of the server-model
  }

  createComplex(payload: any): Observable<Complex> {
    const endpoint = 'wo/read-complexes'
    const url = this.baseUrl + endpoint;
    return this.http.post<Complex>(url, payload, { headers: this.headers });
    // !!!TODO
  }

  generateComplex(): Observable<Complex[]> {

    const endpoint = 'wo/create-complex';
    const url = this.baseUrl + endpoint;

    return this.http.get<Complex[]>(url, { headers: this.headers });
  }

} 
