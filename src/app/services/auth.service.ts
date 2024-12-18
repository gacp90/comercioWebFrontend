import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { UserService } from './user.service';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { CarritoService } from './carrito.service';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin: boolean = false;

  constructor(  private http: HttpClient,
                private router: Router,
                private userService: UserService,
                private carritoService: CarritoService) { }


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
   *   LOGOUT
  ==================================================================== */
  logout(){
    
    this.isLogin = false;
    this.carritoService.isLogin = false;
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.carritoService.cart = {
      items: [],
      total: 0
    }
    this.router.navigateByUrl('/home');
  }

  /** ================================================================
   *  LOGIN
  ==================================================================== */
  private loggedIn = new BehaviorSubject<boolean>(false); // El estado inicial es falso
  loggedIn$ = this.loggedIn.asObservable();

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  login( formData: any ){
    
    return this.http.post(`${base_url}/login/user`, formData)
    .pipe(
      tap( (resp: any) => {

        const { name, lastname, cedula, phone, email, address, city, department, referralCode, referredBy, walletBalance, status, cid, fecha, carrito, activo, vip, wholesale, codearea} = resp.usuario;
        this.userService.user = new User( name, lastname, cedula, phone, email, '***', address, city, department, 'party_type', referralCode, referredBy, walletBalance, status, fecha, codearea, activo, wholesale, vip, carrito, cid, cid );
        
        localStorage.setItem('token', resp.token);                          
        this.setLoggedIn(true);
        
        this.carritoService.isLogin = true;
        
        // VALIDAMOS SI TIENE PRODUCTOS EN EL CARRITO EL USUARIO
        if (this.userService.user.carrito?.items.length! > 0) {
          
          this.carritoService.cart = {
            items: [],
            total: this.userService.user.carrito?.total!
          };

          // AGREGAMOS LOS PRODUCTOS AL CARRITO
          for (const it of this.userService.user.carrito?.items!) {
            it.product.pid = it.product._id;
            this.carritoService.cart.items.push(it)
          }

          localStorage.setItem('cart', JSON.stringify(this.carritoService.cart));
                               
        }else{  
          
          let its: any[] = [];
          
          // COMPROBAMOS QUE EXISTAN PRODUCTOS EN EL LOCALSTORAGE
          if (localStorage.getItem('cart') !== null) {

            let carrito: any = JSON.parse(localStorage.getItem('cart')!);
            for (const item of carrito['items']) {
              its.push({
                product: item.product.pid,
                qty: item.qty,
                price: item.price
              });
            }

            let cart = {
              items: its,
              total: Number(carrito['total'])
            }
  
            // GUARDAMOS LOS PRODUCTOS EN EL USUARIO 
            this.userService.updateUser({carrito: cart}, this.userService.user._id!).subscribe();

          }

        }
        
      }),
      catchError( error => of(false) )
    );
  }

  /** ================================================================
   *   VALIDATE TOKEN OR RENEW TOKEN
  ==================================================================== */
  validateToken():Observable<boolean>{
    
    return this.http.get(`${base_url}/login/user/renew`, this.headers)
    .pipe(
      tap( (resp: any) => {

        const { name, lastname, cedula, phone, email, address, city, department, referralCode, referredBy, walletBalance, status, cid, fecha, carrito, activo, codearea, vip, wholesale} = resp.usuario;

        this.userService.user = new User( name, lastname, cedula, phone, email, '***', address, city, department, 'party_type', referralCode, referredBy, walletBalance, status, fecha, codearea, activo, wholesale, vip,  carrito, cid, cid );

        localStorage.setItem('token', resp.token);
        this.carritoService.isLogin = true;
        this.setLoggedIn(true);

      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  /** ================================================================
   *   REGISTER
  ==================================================================== */
  register(formData: any){
    return this.http.post<{ok: boolean, client: User}>(`${base_url}/clients/web`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                    // this.isLogin = true;
                    this.validateToken();
                  }),
                  catchError( error => of(false) )
                );
  }

}
