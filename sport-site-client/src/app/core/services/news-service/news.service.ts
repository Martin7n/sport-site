import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../enviroments/enviroment';

export interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  image_url?: string;
  source_id?: string;
}

interface NewsApiResponse {
  status: string;
  results: NewsArticle[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  private apiKey = environment.newsApiKey;
  private latestUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}  

  fetchCrossfitNews(): Observable<NewsArticle[]> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('qInTitle', 'crossfit OR bodybuilding OR weightlifting')
      .set('language', 'en')
      .set('category', 'sports')
      
      ;

    return this.http.get<NewsApiResponse>(this.latestUrl, { params }).pipe(
      map((res: NewsApiResponse) => res.results || []),
      catchError((err) => {
        console.error('News fetch failed:', err);
        return of([]);
      })
    );
  }
}
