import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_SERVER = 'http://localhost:3000';
const API_URL = '/user/login';

@Injectable({
  providedIn: 'root' // teremos uma única instância para a aplicação inteira
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  /**
   * envia uma autenticacao com os param passados
   * retorna um objeto Observable valido
   */
  authenticate(userName: string, password: string) {
    return this.httpClient.post(API_SERVER + API_URL, {userName, password}); // foi omitido os valores chave do objeto JSON
  }

}
