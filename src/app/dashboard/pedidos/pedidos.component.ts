import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedidos.model';
import { User } from 'src/app/models/user.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public user!: User;

  constructor(  private pedidosService: PedidosService,
                private userService: UserService){
                  this.user = userService.user;

                  this.query.client = this.user.cid!;
                }

  ngOnInit(): void {
    this.loadPedidos();
  }

  /** ================================================================
   *   CARGAR PEDIDOS
  ==================================================================== */
  public pedidos: Pedido[] = [];
  public query = {
    client:'',
    desde: 0,
    hasta: 50,
    sort: {fecha:-1}
  }

  loadPedidos(){

    this.query.client = this.user.cid!;

    this.pedidosService.loadPedidos(this.query)
        .subscribe( ({pedidos}) => {
          this.pedidos = pedidos;
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *   SELECCIONAR PEDIDO
  ==================================================================== */
  public pedidoS!: Pedido;

}
