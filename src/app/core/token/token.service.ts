import { Injectable } from '@angular/core';

const authToken = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService {

    getToken() {
        return window.localStorage.getItem(authToken);
    }
    setToken(token: string) {
        window.localStorage.setItem(authToken, token);
    }
    hasToken() {
        /**
         * se this.getToken() for nulo, 
         * a primeira exclamação trocará para "verdadeiro", 
         * e a segunda, para "falso", como queremos. 
         * Da mesma maneira, se this.getToken() 
         * for uma string existente, a primeira exclamação 
         * a trocará por "falso", e depois ela virará "verdadeiro". 
         * Isso é muito utilizado no JavaScript, 
         * para converter valores em booleanos.
         */
        return !!this.getToken();

    }
    removeToken() {
        window.localStorage.removeItem(authToken);
    }
}
