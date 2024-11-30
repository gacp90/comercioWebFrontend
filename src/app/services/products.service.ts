import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { LoadProducts } from '../interfaces/load-products.interface';
import { Product } from '../models/products.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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
   *   LOAD PRODUCTS
  ==================================================================== */
  loadProducts(query: any){
    return this.http.post<LoadProducts>( `${base_url}/products/clients/query`, query, this.headers );
  }

  /** ================================================================
   *   LOAD PRODUCT ID
  ==================================================================== */
  loadProductID(id: string){
    return this.http.get<{product: Product, ok: boolean}>( `${base_url}/products/${id}`, this.headers );
  }


}
