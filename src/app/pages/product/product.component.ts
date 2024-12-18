import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.model';
import { CarritoService } from 'src/app/services/carrito.service';

// SERIVES
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public user!: User;

  constructor(  private activatedRoute: ActivatedRoute,
                private productsService: ProductsService,
                private userService: UserService,
                private carritoService: CarritoService){

                  activatedRoute.params.subscribe( ({id}) => {

                    this.user = userService.user

                    this.loadProduct(id);

                  })

                }

  ngOnInit(): void {
    
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
   *  LOAD PRODUCT ID
  ==================================================================== */
  public portada!: string;
  public product!: Product;
  public stock: any;
  loadProduct(id:string){

    this.productsService.loadProductID(id)
        .subscribe( ({product}) =>{

          this.portada = 'none';

          if (product.img.length > 0) {
            this.portada = product.img[0].img;            
          }

          this.product = product;    
          
          this.stock = Array(product.inventory).fill(1).map((x,i)=>i);  
          this.scrollTop();  

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /**======================================================================
   * ADD PRODUCT CART
  ===================================================================== */
  addProductCart(product: Product, qty: any){
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

}
