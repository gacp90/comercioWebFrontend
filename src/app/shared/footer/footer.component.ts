import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public empresa:any;

  constructor(  private empresaService: EmpresaService){}

  ngOnInit(): void {
    this.empresaService.loadEmpresa()
        .subscribe( ({empresa}) => {
          this.empresa = empresa;
        })
  }

  public year = new Date().getFullYear();

}
