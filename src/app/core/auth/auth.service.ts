import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

const API_SERVER = environment.ApiUrl;
const API_URL = '/user/login';
const TOKEN_HEADER = 'x-access-token';

@Injectable({
  providedIn: 'root' // teremos uma única instância para a aplicação inteira
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  /**
   * envia uma autenticacao com os param passados
   * retorna um objeto Observable valido
   */
  authenticate(userName: string, password: string) {
    return this.httpClient
                  .post(API_SERVER + API_URL,
                        {userName, password}, // foi omitido os valores chave do objeto JSON
                        {observe: 'response'}) // indica que usaremos a resposta do cabecalho
                  .pipe(tap(
                    // retorna o valor do token disponibilizado no cabecalho
                    res => {
                      const authToken = res.headers.get(TOKEN_HEADER);
                      this.userService.setToken(authToken);
                      console.log(`User ${userName} authenticated with token ${authToken}`);
                    }
                  ));
  }

}
