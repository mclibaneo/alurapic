import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jtw_decode from 'jwt-decode'; // import atipico

@Injectable({providedIn: 'root'})
export class UserService {

    /**
     * Apos a emissao de um valor,
     * caso este nao seja consumido ou escutado,
     * o BehaviorSubject o mantera armazenado.
     * E se alguem faz o subscribe depois,
     * tera acesso ao ultimo valor emitido.
     */
    private userSubject = new BehaviorSubject<User>(null); // quem fizer o subscribe recebera algo do tipo user
    private userName: string;

    constructor(private tokenService: TokenService) {
        /**
         * O construtor se perguntara se ha token na aplicacao,
         * caso nao haja, o decodeAndNotify() nao sera feito.
         * Apos o login, o setToken() sera chamado,
         * o token sera aguardado e o
         * decodeAndNotify() sera chamado,
         * o qual por sua vez decodificara o token
         * e pegara as informacoes do usuario logado,
         * emitindo-as no userSubject para exibicao no header.
         */
        // tslint:disable-next-line: no-unused-expression
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }
    decodeAndNotify() {
        const token = this.tokenService.getToken();
        // pegara o Payload do token, decodificando-o e jogando-o a variável user
        const user = jtw_decode(token) as User; // descriptografa o token e set como user
        this.userName = user.name;
        this.userSubject.next(user);
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    getUserName() {
        return this.userName;
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }



}
