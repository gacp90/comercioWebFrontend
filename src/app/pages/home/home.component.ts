import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

// import Swiper core and required modules
import SwiperCore, { EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/configuracion.model';
import { CarruselesService } from 'src/app/services/carruseles.service';
import { Carrusel } from 'src/app/models/carrusel.model';
import Swal from 'sweetalert2';

// install Swiper modules
SwiperCore.use([EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public empresa!: Empresa;

  constructor(  private empresaService: EmpresaService,
                private carruselesService: CarruselesService
  ){

  }

  ngOnInit(): void {

    this.loadCarruseles();

    this.empresaService.loadEmpresa()
        .subscribe( ({empresa}) => {
          this.empresa = empresa;
        })

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
    
  }

  public config = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 40
      }
    },
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };

  /** ================================================================
   *   LOAD CARRUSELES
  ==================================================================== */
  public carruseles: Carrusel[] = [];
  loadCarruseles(){

    let query = {
      desde: 0,
      hasta: 0,
      sort: {},
      status: true
    }

    this.carruselesService.loadCarruseles( query )
        .subscribe( ({carruseles}) => {
          this.carruseles = carruseles;

          console.log(carruseles);
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }


}
