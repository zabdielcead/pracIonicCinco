import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;
  peliculas: Peliculas[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos'];

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {}

  onSearchChange(event) {
    const valor = event.detail.value;
    this.buscando = true;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.moviesService.buscarPeliculas(valor)
        .subscribe( resp => {
          console.log(resp);
          this.peliculas = resp[`results`];
          this.buscando = false;
        });
  }

  async detalle(id: string) {
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });
      modal.present();
  }



}
