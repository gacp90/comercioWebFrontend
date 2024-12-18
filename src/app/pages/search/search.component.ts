import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Product } from 'src/app/models/products.model';

import { CarritoService } from 'src/app/services/carrito.service';
import { ProductsService } from 'src/app/services/products.service';
import { SearchService } from 'src/app/services/search.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public terminoTemp:string = '';
  public user!: User;

  constructor(  private activatedRoute: ActivatedRoute,
                private searchService: SearchService,
                private carritoService: CarritoService,
                private userService: UserService,
                private productsService: ProductsService){

    activatedRoute.params.subscribe( ({tipo, termino}) =>{

      this.user = userService.user;

      if (this.terminoTemp !== termino) {
        this.desde = 0;
        this.hasta = 10;
        this.terminoTemp = termino;
        this.loadBtn = false;
      }      

      if (tipo === 'producto') {
        this.search('products', termino);
      }else if(tipo === 'categoria'){
        this.searchCategory(termino);
      }
            
    })

  }

    /**======================================================================
   * ADD PRODUCT CART
  ===================================================================== */
  addProductCart(product: Product, qty: number){
    qty = Number(qty);
    let price = 0;

    if (product.offert) {
      price = product.offertPrice;
    }

    if (this.user) {
      if (this.user.wholesale) {
        price = product.wholesale;
      }
      if (this.user.vip) {
        price = product.vip;
      }
    }

    this.carritoService.upCarrito(product, qty, price);
  }

  /** ================================================================
   *  SCROLL
  ==================================================================== */
  scrollTop(){
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

  /** ================================================================
   *   SEARCH
  ==================================================================== */
  public products: Product[] = [];
  public desde: number = 0;
  public hasta: number = 10;

  search(tipo: 'products', termino: string){

    this.searchService.search(tipo, termino,`desde=${this.desde}&hasta=${this.hasta}&web=si`)
        .subscribe( ({resultados}) => {
          this.products = resultados;
          this.scrollTop();
        }, (err) =>{
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })


  }

  /** ================================================================
   *   SEARCH FOR CATEGORY
  ==================================================================== */
  searchCategory(categoria: string){

    this.productsService.loadProducts({categoria, status: true, desde: this.desde, hasta: this.hasta })
        .subscribe( ({products}) => {
          this.products = products;
          this.scrollTop();
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg);          
        })

  }

  /** ================================================================
   *  LOAD MORE
  ==================================================================== */
  public loadBtn: boolean = false;
  loadMore(){

    this.activatedRoute.params
        .subscribe( ({tipo, termino}) =>{

          this.desde += 10;

          if (tipo === 'producto') {
            
            this.searchService.search('products', termino,`desde=${this.desde}&hasta=${this.hasta}&web=si`)
              .subscribe( ({resultados}) => {

                if (resultados.length === 0) {
                  this.loadBtn = true;
                  return;
                }
                
                for (const product of resultados) {
                  this.products.push(product);
                }
                

              }, (err) =>{
                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');          
              })

          }else if(tipo === 'categoria'){

            this.productsService.loadProducts({categoria: termino, status: true, desde: this.desde, hasta: this.hasta, inventory: { $gte: 1, $lt: 10000000 }})
              .subscribe( ({products}) => {

                if (products.length === 0) {
                  this.loadBtn = true;
                  return;
                }
                
                for (const product of products) {
                  this.products.push(product);
                }
              }, (err) => {
                console.log(err);
                Swal.fire('Error', err.error.msg);          
              })
          }
                
        })

  }

}
