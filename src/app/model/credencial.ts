export class Credencial {
    client_id: string;
    username: string;
    password: string;
    grant_type: string;
    scope: string;
  
    constructor(username: string, password: string) {
            this.client_id = 'proffy';
            this.username = username;
            this.password = password;
            this.grant_type = 'password';
            this.scope = 'openid'
    }
}