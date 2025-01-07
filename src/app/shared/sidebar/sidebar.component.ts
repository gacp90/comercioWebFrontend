import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/configuracion.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public empresa!: Empresa;

  constructor(  private categoryService: CategoryService,
                private empresaService: EmpresaService
  ){}

  ngOnInit(): void {
    this.loadCategories();
    this.empresaService.loadEmpresa()
      .subscribe( ({empresa}) => {
        this.empresa = empresa;
      })
  }

  /** ================================================================
   *  LOAD CATEGORIES
  ==================================================================== */
  public categories: Category[] = [];
  loadCategories(){

    this.categoryService.loadCategories({status: true, desde: 0, hasta: 100})
        .subscribe( ({categories}) => {
          this.categories = categories;
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *  CERRAR MENU
  ==================================================================== */
  @ViewChild('cerrar') cerrar!: ElementRef;
  cerrarMenu(){
    this.cerrar.nativeElement.click();
  }

}
