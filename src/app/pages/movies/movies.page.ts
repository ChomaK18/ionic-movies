import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, LoadingController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if(event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
