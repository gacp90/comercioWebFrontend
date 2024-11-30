import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../models/user.model';

import { CarritoService } from './carrito.service';
import { _item } from '../interfaces/carrito.interface';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;
  

  constructor(  private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) { }
  
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
   *   RECUPERAR PASSWORD
  ==================================================================== */
  recuperarPassword( formData: any ){
    return this.http.post(`${base_url}/login/recuperar/password`, formData);
  } 

  /** ================================================================
   *  UPDATE USER
  ==================================================================== */
  updateUser( formData: any, id: string ){
    return this.http.put< { client: User, ok: boolean } >(`${base_url}/clients/web/${id}`, formData, this.headers);
  }

  /** ================================================================
   *   LOAD LEVELS
  ==================================================================== */
  loadLevelsUser(cid: string){
    return this.http.get<{ok: boolean, first: User[], two: User[], three: User[], four: User[]}>( `${base_url}/clients/level/${cid}`, this.headers );
  }

  


  // FIN DE LA CLASE
}
