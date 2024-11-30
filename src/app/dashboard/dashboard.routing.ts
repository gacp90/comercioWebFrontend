import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

// 
import { AuthGuard } from '../guards/auth.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [    
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilComponent, data:{ titulo: 'Perfil'} },
            { path: 'niveles', component: NivelesComponent, data:{ titulo: 'Niveles'} },
            { path: 'password', component: PasswordComponent, data:{ titulo: 'Passwrod'} },
            { path: 'perfil', component: PerfilComponent, data:{ titulo: 'Perfil'} },
            { path: 'pedidos', component: PedidosComponent, data:{ titulo: 'Mis Pedidos'} },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}