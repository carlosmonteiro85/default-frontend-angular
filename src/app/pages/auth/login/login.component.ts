import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '@/layout/service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

  email = '';
  password = '';
  checked = false;

onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso!');
        // Agora sim, após o sucesso, redirecionamos
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Erro ao autenticar no Keycloak', err);
        alert('Falha no login. Verifique suas credenciais.');
      }
    });
  }
}
