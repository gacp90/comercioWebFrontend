import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        data:{ title: 'Inicio' },
        children:
        [
            { path: '', component: HomeComponent, data:{ title: 'Inicio' } },
            { path: 'carrito', component: CarritoComponent, data:{ titulo: 'Carrito'} },
            { path: 'home', component: HomeComponent, data:{ titulo: 'Inicio'} },
            { path: 'producto/:id', component: ProductComponent, data:{ titulo: 'Producto'} },
            { path: 'search/:tipo/:termino', component: SearchComponent, data:{ titulo: 'Search'} },
        ] 
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
