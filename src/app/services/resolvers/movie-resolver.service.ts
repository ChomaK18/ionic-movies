import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MovieService } from '../movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<any>{

  constructor(private movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.movieService.getMovieDetails(route.paramMap.get('id'))
  }
}
