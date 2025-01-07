import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';
import { Empresa } from '../models/configuracion.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
  *  LOAD
  ==================================================================== */
    public configuracion!: Empresa;
    loadEmpresa(){
      return this.http.get<{ok: boolean, empresa: Empresa}>( `${base_url}/asdas`)
        .pipe(
          tap(({ok, empresa}) => {            
            this.configuracion = empresa;                     
          })
        );
    }
}
