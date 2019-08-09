import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slidesshow-pares',
  templateUrl: './slidesshow-pares.component.html',
  styleUrls: ['./slidesshow-pares.component.scss'],
})
export class SlidesshowParesComponent implements OnInit {
  @Input() peliculas: Peliculas[] = [];
  @Output() cargarMas = new EventEmitter();
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick( ) {
    this.cargarMas.emit();
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
