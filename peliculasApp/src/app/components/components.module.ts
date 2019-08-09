import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlidesshowParesComponent } from './slidesshow-pares/slidesshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  entryComponents: [
    DetalleComponent
  ],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlidesshowParesComponent,
    DetalleComponent
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlidesshowParesComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
