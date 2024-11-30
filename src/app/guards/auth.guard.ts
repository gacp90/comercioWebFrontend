import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(  private router:Router,
                private authService: AuthService,
                private carritoService:CarritoService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.authService.validateToken()
      .pipe(
        tap( isauthenticated => {
          if (!isauthenticated) {
            this.router.navigateByUrl('/home');
            this.carritoService.isLogin = false;
            this.authService.setLoggedIn(false);
            localStorage.removeItem('token');
          }
        })
    );
  }
  
}
