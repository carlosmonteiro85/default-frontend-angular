import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@/model/token';
import { API_CONFIG } from '@/config/api-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_URL = API_CONFIG.authUrl;
    private readonly CLIENT_ID = API_CONFIG.clienteId;

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Observable<Token> {
        const body = new HttpParams()
            .set('client_id', this.CLIENT_ID)
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password')
            .set('scope', 'openid');

        return this.http.post<Token>(this.TOKEN_URL, body.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(tap(res => this.saveTokens(res)));
    }

    refreshToken(): Observable<Token> {
        const refreshToken = localStorage.getItem('refresh_token');
        const body = new HttpParams()
            .set('client_id', this.CLIENT_ID)
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken || '');

        return this.http.post<Token>(this.TOKEN_URL, body.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(tap({
            next: res => this.saveTokens(res),
            error: () => this.logout() // Se o refresh falhar, limpa tudo
        }));
    }

    private saveTokens(res: Token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
    }

    getAccessToken() { return localStorage.getItem('access_token'); }

    logout() {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    getUserRoles(): string[] {
        const token = this.getAccessToken();
        if (!token) return [];

        try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));

            return decoded.realm_access?.roles || [];
        } catch (e) {
            return [];
        }
    }

    hasRole(role: string): boolean {
        return this.getUserRoles().includes(role);
    }
}