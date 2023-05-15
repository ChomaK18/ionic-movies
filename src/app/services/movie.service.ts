import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // TODO: add posters in pipe(map())
  getTopRatedMovies(page = 1) : Observable<ApiResult>{
    return this.http.get<ApiResult>(`${env.baseUrl}/movie/popular?api_key=${env.apiKey}&page=${page}`);  
  }

  searchMovie(query: string) :Observable<ApiResult>{
    return this.http.get<ApiResult>(`${env.baseUrl}/search/movie?api_key=${env.apiKey}&query=${query}`)
  }

  getMovieDetails(id: string | null): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${env.baseUrl}/movie/${id}?api_key=${env.apiKey}`);
  }

  discoverMovie(sortBy: string, trend: string): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${env.baseUrl}/discover/movie?api_key=${env.apiKey}&sort_by=${sortBy}.${trend}`);
  }

}
