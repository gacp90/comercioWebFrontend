import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { User } from 'src/app/models/user.model';

import { Carrito } from 'src/app/interfaces/carrito.interface';

import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from '../../../environments/environment';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/configuracion.model';

interface _carrito{
  items: any[],
  total: number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  public carrito: any;
  public user!: User;

  isLoggedIn = false;

  public empresa!: Empresa;

  constructor(  private carritoService: CarritoService,
                private router: Router,
                private userService: UserService,
                private authService: AuthService,
                private cd: ChangeDetectorRef,
                private empresaService: EmpresaService  ){      
      
      this.carrito = carritoService.cart;
      this.user = userService.user;
      
      
      
      
  }

  ngOnInit(): void {

    // LOAD WORKER
    this.cargarUser();

    this.empresaService.loadEmpresa()
        .subscribe( ({empresa}) => {
          this.empresa = empresa;
        })
    

    this.carritoService.getCartLocal();

    this.authService.loggedIn$.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
        this.cd.detectChanges(); // Fuerza la detección de cambios si es necesario
      }
    );

   

  }

  /** ================================================================
   *  CARGAR WORKER
  ==================================================================== */
  cargarUser(){

    if (!localStorage.getItem('token')) {
      this.isLoggedIn = false;
      return;
    }else{
      this.isLoggedIn = true;
      this.authService.validateToken()
      .subscribe( resp => {
        
        if (resp) {
          this.user = this.userService.user;         
          
        }else{

          localStorage.removeItem('token');
          window.location.reload();
          this.isLoggedIn = false;
        }        

      });
    }

  }

  /** ================================================================
   *  DEL ITEM CARRITO
  ==================================================================== */
  delItem(i: any){
    this.carritoService.delItemCart(i);
  }

  /** ================================================================
   *  SEARCH PRODUCT
  ==================================================================== */
  search(termino: string){
    this.router.navigateByUrl(`/search/producto/${termino}`);
  }

  /** ================================================================
   *  LOGOUT
  ==================================================================== */
  logout(){    
    
    this.authService.logout();
    this.isLoggedIn = false;
  }

  // FIN DE LA CLASE
}
