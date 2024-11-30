import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public page!: string;

  constructor(  private router: Router) { 
    
    this.router.events
        .pipe(
          filter( event => event instanceof ActivationEnd ),
          filter( (event: any) => event.snapshot.firstChild === null  ),
          map( (event: any) => event.snapshot.data )
        )
        .subscribe( data => {
          
          this.page = data.titulo;
          document.title = `${data.titulo}`;
        
        }); 
  }

}
