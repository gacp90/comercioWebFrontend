import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedidos.model';
import { Product } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { _item } from 'src/app/interfaces/carrito.interface';

interface _carrito{
  items: any[],
  total: number
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public empresa:any = environment.empresa;

  public carrito!: _carrito;

  constructor(  private carritoService: CarritoService,
                private pedidosService: PedidosService,
                private productsService: ProductsService,
                private userService: UserService){
    this.carrito = carritoService.cart;
  }

  public user!: User;
  public saldo: number = 0;
  public menS: number = 0;
  public mayS: number = 0;

  ngOnInit(): void {
      
    // LOAD USER
    if (localStorage.getItem('token') !== null) {
      this.user = this.userService.user;

      let total = this.carrito.total;

      if (total < this.mayS) {
        total += 5000;
      }

      if (this.user.walletBalance > total) {
        this.saldo = total;
      }else{
        this.saldo = this.user.walletBalance;
      }      

    }

    // LOAD CARRITO
    this.loadItems();

  }

  /** ================================================================
   *  LOAD CARRITO
  ==================================================================== */
  public produtsDB: Product[] = [];
  loadItems(){

    if (this.carrito.items.length > 0) {      
      let pro = [];
      for (const it of this.carrito.items) {
        pro.push({
          sku: it.product.sku
        })
      }

      let itt = [pro]

      let query = {
        desde: 0,
        hasta: 1000,
        $or: itt[0]
      }
      
      this.productsService.loadProducts(query)
          .subscribe( ({products}) =>{

            this.produtsDB = products;

          }, (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');            
          })
      
      
    }

  }

  /** ================================================================
   *  UPDATE CANT
  ==================================================================== */
  updateCant(product: Product, qty: any){

    qty = Number(qty);
    
    this.produtsDB.map( (prod) => {

      if (prod.pid === product.pid) {
        
        this.carritoService.upCarrito(prod, qty);

      }

    })
     


  }

  /** ================================================================
   *  CHANGE SALDO
  ==================================================================== */
  changeSaldo(saldo: any){
    saldo = Number(saldo);

    if (saldo > this.user.walletBalance) {
      this.saldo = this.user.walletBalance;
      this.saldoI.nativeElement.value = this.user.walletBalance;
    }else if(saldo <= 0){
      this.saldo = 0;
      this.saldoI.nativeElement.value = 0;
    }else{
      this.saldo = saldo;
    }

  }

  /** ================================================================
   *  DEL ITEM CARRITO
  ==================================================================== */
  delItem(i: any){
    this.carritoService.delItemCart(i);
  }

  /** ================================================================
   *  AGREGAR DETALLES
  ==================================================================== */
  addDetails(details: string, i: any){

    this.carrito.items[i].details = details;

    let its: any[] = [];
    for (const item of this.carrito.items) {
      its.push({
        product: item.product.pid,
        qty: item.qty,
        details: item.details || '',
        price: item.price
      });
    }

    let cart = {
      items: its,
      total: this.carrito.total
    }

    this.userService.updateUser({carrito: cart}, this.user._id!)
        .subscribe( ({client}) => {

          this.loadItems();

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *  CREATE PEDIDO
  ==================================================================== */
  @ViewChild('checkS') checkS!: ElementRef;
  @ViewChild('saldoI') saldoI!: ElementRef;
  public sendP: boolean = false;

  createPedido(){    

    let formData: any = {
      amount: this.carrito.total,
      items: []
    }

    this.sendP = true;

    if (this.carrito.items.length === 0) {
      Swal.fire('Atención', 'Debes de agregar almenos un producto al carrito de compra', 'warning');
      this.sendP = false;
      return
    }

    if (this.checkS.nativeElement.checked) {

      if (Number(this.saldoI.nativeElement.value) > this.user.walletBalance  ) {
        Swal.fire('Atención', 'El monto a usar no debe ser superior a lo que tienes disponible', 'warning');
        this.saldoI.nativeElement.value = this.user.walletBalance;
        this.sendP = false;
        return;
      }

      formData.saldo = Number(this.saldoI.nativeElement.value);
      this.userService.user.walletBalance -= formData.saldo;
      
    }

    for (const item of this.carrito.items) {
      formData.items.push({
        sku: item.product.sku,
        quantity: item.qty,
        price: item.price,
        cost: item.product.cost,
        description: `${item.product.name} | details: ${item.details}`,
        product: item.product.pid,
        taxes: item.product.taxes
      })
    }
    
    this.pedidosService.createPedido(formData)
        .subscribe( ({ pedido }) => {

          formData = {
            items:[],
            amount:0
          }

          // ELIMINAR LOS PRODUCTOS DEL LOCALSTORAGE Y ACTUALIZAR
          localStorage.removeItem('cart');
          this.carritoService.cart.items = [];
          this.carritoService.cart.total = 0;
          this.checkS.nativeElement.checked = false;
          this.sendP = false;
          
          Swal.fire('Estupendo', `Se ha creado el pedido #${pedido.pedido} exitosamente, pronto nos pondremos en contacto contigo!`, 'success');
          if (this.saldoI.nativeElement) {
            this.saldoI.nativeElement.value = 0;            
          }

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  // FIN DE LA CLASE
}
