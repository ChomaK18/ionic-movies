import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, LoadingController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MoviesPage implements OnInit, OnDestroy {

  movies: any[] = [];
  filteredMovies: any[] = [];
  selectValue = "";
  radioValue = "";
  isSearching = false;
  currentPage = 1;
  imageBaseUrl = environment.images;
  private readonly destroyed$ = new Subject<void>();

  constructor(private movieService: MovieService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        loading.dismiss();
        this.movies.push(...res.results);
        console.log("getTopRatedMovies", res);

        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      });
  }

  handleInput(event: any) {
    const query = event.target.value;
    if (query) {
      this.movieService.searchMovie(query)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          this.isSearching = true;
          this.filteredMovies = res.results.sort((a, b) => b.vote_average - a.vote_average);
        })
    } else {
      this.isSearching = false;
    }
  }

  sort() {
    this.movieService.discoverMovie(this.selectValue, this.radioValue)
      .subscribe(res => {
        console.log("discover", res);
      })
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
