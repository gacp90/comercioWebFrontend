import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Pedido } from '../models/pedidos.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   CREATE PEDIDO
  ==================================================================== */
  createPedido(formData: any){
    return this.http.post<{ok: boolean, pedido: Pedido}>(`${base_url}/pedidos`, formData, this.headers);
  }

  /** ================================================================
   *  LOAD PEDIDOS
  ==================================================================== */
  loadPedidos(query: any){
    return this.http.post<{ok: boolean, pedidos: Pedido[], total: number}>( `${base_url}/pedidos/query`, query, this.headers);
  }

}
