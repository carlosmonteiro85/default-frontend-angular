# Base

Este projeto usa o angular [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Permissoes de paginas

As permissões são obtidas no token, no componente AuthService, obterm o token e o refresh token do keycloak

### URL
* proteger as rotas no componente: Rotes
Exemplo:     
    { 
        path: 'lancamento', 
        component: LancamentoComponent,
        canActivate: [roleGuard('ADMIN')] // permissão obtida no token 
    }, 

* proteger o Menu no component: AppMenu
Exemplo:     
    {
        label: 'Páginas',
        visible: this.authService.hasRole('ADMIN') || this.authService.hasRole('MANAGER'), // permisssão obtida no token
        items: [
            { label: 'Lançamentos', icon: 'pi pi-dollar', routerLink: ['/pages/lancamento'] },
            { label: 'Categorias', icon: 'pi pi-tag', routerLink: ['/pages/categoria'] }
        ]
    },
