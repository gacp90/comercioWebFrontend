import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   SEARCH
  ==================================================================== */
  search(
    tipo: 'products',
    termino: string,
    query: string = ''
  ){
    let endPoint = `/search/${tipo}/${termino}?${query}`;

    return this.http.get< { resultados: any[], total: number } >(`${base_url}${endPoint}`)
          .pipe(
            map( (resp: any) => {              
              return resp;
            })
          );
  }

}
