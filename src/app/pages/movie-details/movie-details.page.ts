import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit {

  movie: any = null;
  imageBaseUrl = environment.images;

  constructor(private route: ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id || "1").subscribe(movie => {
      this.movie = movie;
      console.log(movie);
    })
  }

  openHomepage() {
    window.open(this.movie.homepage);
  }
}
