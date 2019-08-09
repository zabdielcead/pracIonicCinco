import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import {  Peliculas } from '../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas[] = [];

  constructor( private moviesService: MoviesService ) {}

  ngOnInit() {
    this.moviesService.getFeature()
        .subscribe( (resp) => {
            console.log('Respuesta', resp);
            this.peliculasRecientes = resp.results;
        });
    this.getPopulares();
  }

  cargarMas() {
      this.getPopulares();
  }
  getPopulares() {
      this.moviesService.getPopulares()
      .subscribe( (resp) => {
         // console.log('Populares', resp);
         const arrTemp = [...this.populares, ...resp.results]; // concatenando los arreglos y el primero con el de las demas pags
         this.populares = arrTemp;
        // this.populares.push(...resp.results);
         // this.populares = resp.results;
        });
  }
}
