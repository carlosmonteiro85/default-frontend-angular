import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud.componer';
import { EmptyComponent } from './empty/empty.component';
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
        canActivate: [roleGuard('admin')] 
    },
    { 
        path: 'categoria', 
        component: CategoriaComponent,
        canActivate: [roleGuard('admin')]  
    },
    { 
        path: 'empty', 
        component: EmptyComponent },
    { 
        path: '**', 
        redirectTo: '/notfound' 
    }
] as Routes;
