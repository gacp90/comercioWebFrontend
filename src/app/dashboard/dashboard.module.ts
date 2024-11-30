import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PipesModule } from '../pipes/pipes.module';
import { NivelesComponent } from './niveles/niveles.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent,
    HeaderComponent,
    SidebarComponent,
    PedidosComponent,
    NivelesComponent,
    PasswordComponent,
  ],
  exports: [
    PerfilComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
