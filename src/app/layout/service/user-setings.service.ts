import { inject, Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { LayoutService } from './layout.service';
import { UserSettings } from '@/model/user-setings';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
    layoutService = inject(LayoutService);

    // MOCK: Dados que viriam do seu banco de dados
    private mockBackendSettings: UserSettings = {
        darkMode: false,
        primaryColor: 'emerald',
        menuMode: 'static',
        ripple: true
    };

    // Simula a busca no banco ao logar
    loadUserSettings() {
        return of(this.mockBackendSettings).pipe(delay(500));
    }

    applySettings(settings: UserSettings) {
        // 1. Atualiza o estado (Signals)
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: settings.darkMode,
            primary: settings.primaryColor,
            menuMode: settings.menuMode,
            ripple: settings.ripple
        }));

        // 2. Troca o arquivo de Tema (Cores)
        // O Sakai costuma ter esse método ou você pode fazer manualmente:
        const themeFamily = 'lara'; // ou 'aura', 'viva' conforme sua versão
        const mode = settings.darkMode ? 'dark' : 'left';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link'); // Verifique o ID no index.html

        if (themeLink) {
            const newHref = `assets/layout/styles/theme/${themeFamily}-${mode}-${settings.primaryColor}/theme.css`;
            themeLink.href = newHref;
        }
    }

    private changeTheme(color: string, isDark: boolean) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const themeFamily = 'lara'; // ou o tema que seu Sakai está usando (lara, viva, aura)
        const mode = isDark ? 'dark' : 'light';

        const newHref = `assets/layout/styles/theme/${themeFamily}-${mode}-${color}/theme.css`;

        if (themeLink) {
            themeLink.href = newHref;
        }
    }
}