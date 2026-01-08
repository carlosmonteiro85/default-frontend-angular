import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layout/service/auth.service';

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // 1. Verifica se está autenticado
    if (!authService.getAccessToken()) {
      router.navigate(['/auth/login']);
      return false;
    }

    // 2. Verifica se possui a role necessária
    if (authService.hasRole(requiredRole)) {
      return true;
    }

    // 3. Se não tiver permissão, redireciona para a tela de erro
    router.navigate(['/auth/access']);
    return false;
  };
};