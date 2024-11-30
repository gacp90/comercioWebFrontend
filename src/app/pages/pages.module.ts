import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'

import localEs from '@angular/common/locales/es-CO'
import { registerLocaleData } from '@angular/common'

registerLocaleData(localEs, 'es-CO');

import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ProductsSliderComponent } from './home/swiper/products-slider/products-slider.component';
import { ProductComponent } from './product/product.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    PagesComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    ProductsSliderComponent,
    ProductComponent,
    CarritoComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    PipesModule  
  ],
  exports:[
    PagesComponent,
    ProductsSliderComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
