import { Injectable } from '@angular/core';
import { Carrito } from '../interfaces/carrito.interface';
import { Product } from '../models/products.model';
import { UserService } from './user.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public cart: Carrito = {
    items: [],
    total: 0
  };

  public isLogin: boolean = false;

  constructor(  private userService: UserService) { }

  /** ================================================================
   *  DEL CART
  ==================================================================== */
  // deleteCart(){

  //   this.cart = {
  //     items: [],
  //     total: 0
  //   }

  //   localStorage.removeItem('cart');
  //   this.sumarTotales();

  // }

  /** ================================================================
   *  GET CART
  ==================================================================== */
  getCartLocal(){

    if (localStorage.getItem('cart') !== null) {
      let carrito: any = JSON.parse(localStorage.getItem('cart')!);
      for (const item of carrito['items']) {
        this.cart.items.push(item);
      }

      this.cart.total = Number(carrito['total']);
    }

  }

  /** ================================================================
   *  TOTALES
  ==================================================================== */
  sumarTotales(){

    let total = 0;

    for (const item of this.cart.items) {      
      total = total + (item.qty * item.price);
    }

    this.cart.total = total;

    localStorage.setItem('cart', JSON.stringify(this.cart));

    if (this.isLogin) {      
      
      let its: any[] = [];
      for (const item of this.cart.items) {
        its.push({
          product: item.product.pid,
          qty: item.qty,
          price: item.price
        });
      }

      let cart = {
        items: its,
        total: this.cart.total
      }

      this.userService.updateUser({carrito: cart}, this.userService.user._id!).subscribe();
      
    }

  }

  /** ================================================================
   *  GET CARRITO
  ==================================================================== */
  upCarrito(product: Product, qty: number, precio: number = 0){  


    if (!precio || precio === 0) {
      precio = product.price;      
    }    

    const validarItem = this.cart.items.findIndex( (item) => {
      if (item.product.sku === product.sku) {
        return true;
      }else{
        return false;
      }
    });

    // AGREGAMOS A LA LISTA DE ITEMS
    if (validarItem === -1) {
      
      this.cart.items.push({
        product,
        qty,
        price: precio
      })
    }else{
      this.cart.items.map( (item) => {
        if (item.product.sku === product.sku) {
          item.qty = (item.qty + qty)

          if (item.qty > product.inventory) {
            item.qty = product.inventory;
          }

          if (item.qty <= 0) {
            item.qty = 1;
          }

        }
      })
    }

    Swal.fire({
      position: "top-end",
      toast: true,
      icon: "success",
      text: "Item agregado",
      showConfirmButton: false,
      timer: 1500
    });

    // this.cart.total = this.cart.total + Number(qty * product.price); 
    this.sumarTotales();

  }

  /** ================================================================
   *  DEL ITEM CARRITO
  ==================================================================== */
  delItemCart(i: any){

    this.cart.items.splice(i,1);
    this.sumarTotales();

  }

  // FIN DE LA CLASE

}
