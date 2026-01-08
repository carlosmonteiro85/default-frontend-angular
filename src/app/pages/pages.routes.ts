import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { LancamentoComponent } from './lancamentos/lancamento.component';
import { CategoriaComponent } from './categorias/categoria.component';
import { roleGuard } from './auth/auth-role.guard';

export default [
    { 
        path: 'documentation', 
        component: Documentation 
    },
    { 
        path: 'crud', 
        component: Crud 
    },
    { 
        path: 'lancamento', 
        component: LancamentoComponent,
        canActivate: [roleGuard('ADMIN')] 
    },
    { 
        path: 'categoria', 
        component: CategoriaComponent,
        canActivate: [roleGuard('ADMIN')]  
    },
    { 
        path: 'empty', 
        component: Empty },
    { 
        path: '**', 
        redirectTo: '/notfound' 
    }
] as Routes;
