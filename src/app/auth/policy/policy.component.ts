import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Empresa } from 'src/app/models/configuracion.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  public empresa!: Empresa;
  
  constructor(  private empresaService: EmpresaService){}

  ngOnInit(): void {
    this.empresaService.loadEmpresa()
        .subscribe( ({empresa}) => {
          this.empresa = empresa;
        })
  }


}
