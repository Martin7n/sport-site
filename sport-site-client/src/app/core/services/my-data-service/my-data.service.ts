import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';



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


export class MyDataService {
  private myApiUrl = environment.myApiUrl + "wo/read-complexes";

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
  const headers = new HttpHeaders()
        .set('x-api-key', environment.mApiKey);
  return this.http.get(this.myApiUrl, { headers });

    return this.http.get(this.myApiUrl, { headers });
  }
} 
