import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string) {
      query = URL + query;
      query +=  `&api_key=${ apiKey }&language=es&include_image_language=es`;
     // console.log(query);
      return this.http.get<T>( query );
  }

  getFeature() {
    // tslint:disable-next-line:max-line-length
   // return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&api_key=b517fc113b3a276f51c69fabbbec189d&language=es&include_image_language=es`);
   const hoy = new Date();
   const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1 , 0).getDate();
   const mes = hoy.getMonth() + 1;
   let mesString;

   if (mes < 10) {
      mesString = '0' + mes;
   } else {
    mesString = mes;
   }
   const inicio = `${hoy.getFullYear()}-${mesString}-01`;
   const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

   return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActores(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }
  buscarPeliculas(texto: string ) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }
  cargarGeneros(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp => {
        this.generos = resp[`genres`];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }
}
