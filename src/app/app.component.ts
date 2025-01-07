import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './services/empresa.service';
import { Empresa } from './models/configuracion.model';

import { environment } from '../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
const base_url = environment.base_url;

declare function smoothFunction(): any;
declare function themeJs(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(  private empresaService: EmpresaService,
                private meta: Meta,
                private title: Title
  ){}

  empresa: any;

  ngOnInit(): void {    

    this.empresaService.loadEmpresa()
      .subscribe( ({empresa}) => {

        // Aplicar configuraciones globales dinámicamente
        this.applyGlobalStyles(empresa);
        this.updateFavicon(`${base_url}/uploads/logo/${empresa.ico}`);

        this.title.setTitle(empresa.name || 'Ecommerce');

        // Actualizar descripción
        this.meta.updateTag({ name: 'description', content: empresa.descripcion || 'La mejor tienda en linea' });

        // Actualizar keywords
        this.meta.updateTag({ name: 'keywords', content: empresa.keywords || 'Tienda en linea' });

        // Actualizar el color del tema
        this.meta.updateTag({ name: 'theme-color', content: empresa.header.background || '#2d2d2d' });

        smoothFunction();
        themeJs();
        
      });

  }

  private applyGlobalStyles(empresa: Empresa): void {
    if (empresa.header.background) {
      document.documentElement.style.setProperty('--header-background', empresa.header.background);
      document.documentElement.style.setProperty('--bs-primary', empresa.header.background);
    }
    if (empresa.header.color) {
      document.documentElement.style.setProperty('--header-text-color', empresa.header.color);
    }
    if (empresa.footer.background) {
      document.documentElement.style.setProperty('--footer-background', empresa.footer.background);
    }
    if (empresa.footer.color) {
      document.documentElement.style.setProperty('--footer-text-color', empresa.footer.color);
    }
  }

  private updateFavicon(iconUrl: string): void {
    if (!iconUrl) return;

    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = iconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
}
