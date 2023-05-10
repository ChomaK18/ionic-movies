import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class MoviesPage implements OnInit {

movies = [];
currentPage = 1;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(){
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(movies => console.log(movies));
  }

}
