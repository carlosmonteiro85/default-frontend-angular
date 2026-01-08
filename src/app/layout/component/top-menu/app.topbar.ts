// import { Component, inject } from '@angular/core';
// import { MenuItem } from 'primeng/api';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { StyleClassModule } from 'primeng/styleclass';
// import { AppConfigurator } from '../app.configurator';
// import { LayoutService } from '../../service/layout.service';
// import { AuthService } from '@/layout/service/auth.service';
// import { UserSettingsService } from '@/layout/service/user-setings.service';

// @Component({
//     selector: 'app-topbar',
//     standalone: true,
//     imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
//     templateUrl: './app.topbar.html',
// })
// export class AppTopbar {
//     items!: MenuItem[];

//     layoutService = inject(LayoutService)
//     authService = inject(AuthService)
//     settingsService = inject(UserSettingsService);


//     toggleDarkMode() {
//         // 1. Atualiza o visual imediatamente (Optimistic Update)
//         this.layoutService.layoutConfig.update((state) => {
//             const newVal = !state.darkTheme;
            
//             // 2. MOCK: Simula o salvamento no banco de dados
//             console.log('Salvando no banco: darkTheme =', newVal);
//             // this.http.post('/api/settings', { darkTheme: newVal }).subscribe();
            
//             return { ...state, darkTheme: newVal };
//         });
//     }

//     logout(){
//         this.authService.logout();
//     }
// }
import { Component, inject, OnInit } from '@angular/core'; // Adicionado OnInit
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { LayoutService } from '../../service/layout.service';
import { AuthService } from '@/layout/service/auth.service';
import { UserSettingsService } from '@/layout/service/user-setings.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    templateUrl: './app.topbar.html',
})
export class AppTopbar implements OnInit { // Implementando OnInit
    items!: MenuItem[];

    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    settingsService = inject(UserSettingsService);

    ngOnInit() {
        // Quando a topbar carregar, busca as configurações do Mock
        this.settingsService.loadUserSettings().subscribe({
            next: (settings) => {
                console.log('Configurações carregadas do mock:', settings);
                this.settingsService.applySettings(settings);
            },
            error: (err) => {
                console.error('Erro ao carregar configurações', err);
            }
        });
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => {
            const newVal = !state.darkTheme;
            
            // Simulação de salvamento no banco (Mock)
            console.log('Enviando para o "banco": darkTheme =', newVal);
            
            return { ...state, darkTheme: newVal };
        });
    }

    logout() {
        this.authService.logout();
    }
}