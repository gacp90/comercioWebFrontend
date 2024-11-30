import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [    
    { path: 'login', component: LoginComponent, data:{ title: 'Login' } },
    { path: 'registrarme', component: RegisterComponent, data:{ title: 'Registrarme' } },
    { path: 'policy', component: PolicyComponent, data:{ title: 'Terminos y Politicas de privacidad' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
