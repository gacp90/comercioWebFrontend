import { Injectable } from '@angular/core';
import { Carrusel } from '../models/carrusel.model';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CarruselesService {

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
   *  LOAD
  ==================================================================== */
  loadCarruseles(query: any){
    return this.http.post<{ok: boolean, carruseles: Carrusel[], total:number}>( `${base_url}/carrusel/query`, query, this.headers );
  }
}
