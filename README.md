# 📌 Projeto Angular – Frontend

Este projeto foi desenvolvido utilizando o **Angular CLI** na versão **20.0.5**.

🔗 Documentação oficial:  
https://github.com/angular/angular-cli

---

## 🚀 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão compatível com Angular 20)
- **Angular CLI** `^20.0.5`

Para verificar a versão do Angular CLI:
```bash
ng version
```

---

## ▶️ Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Após iniciar, acesse no navegador:

http://localhost:4200/

A aplicação será recarregada automaticamente sempre que houver alterações nos arquivos de origem.

---

## 🔐 Controle de Permissões e Autenticação

O controle de permissões é baseado nos **roles presentes no token JWT**, obtido via **Keycloak**.

### 📌 AuthService

Responsável por:
- Obter o **token**
- Obter o **refresh token**
- Validar permissões (roles) do usuário

As permissões são extraídas diretamente do token retornado pelo Keycloak.

---

## 🔒 Proteção de Rotas (Guards)

As rotas são protegidas utilizando **Guards**, que verificam se o usuário possui o role necessário.

### Exemplo:
```ts
{
  path: 'lancamento',
  component: LancamentoComponent,
  canActivate: [roleGuard('ADMIN')]
}
```

---

## 🧭 Controle de Acesso no Menu

A visibilidade dos itens do menu é controlada dinamicamente com base nos roles do usuário.

### Exemplo:
```ts
{
  label: 'Páginas',
  visible: this.authService.hasRole('ADMIN') || this.authService.hasRole('MANAGER'),
  items: [
    {
      label: 'Lançamentos',
      icon: 'pi pi-dollar',
      routerLink: ['/pages/lancamento']
    },
    {
      label: 'Categorias',
      icon: 'pi pi-tag',
      routerLink: ['/pages/categoria']
    }
  ]
}
```

---

## 🚧 Status do Projeto

**EM DESENVOLVIMENTO**

Atualmente, o foco está em:
- Implementação da camada de serviços
- Criação de mocks de configurações
- Estruturação inicial de segurança e permissões
