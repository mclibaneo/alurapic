import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * esta classe deve implementar a classe ErrorHandler
 * pois, ira substitu-la no escopo da aplicacao
 */
@Injectable() // para permitir que os elementos sejam injetaveis, mas o erro ja foi provido em errors.module
export class GlobalErrorHandler implements ErrorHandler {

    location: LocationStrategy;
    userService: UserService;
    logService: ServerLogService;
    router: Router;
    /**
     * nao podemos fazer injecao de dependencia direto no cosntrutor, 
     * por isso utilizaremos a estrategia de injetar sobre demanda 
     * @param injector para injecao de dependencia sobre demanda
     */
    constructor(private injector: Injector) {}

    /**
     * Injecao de dependencias aqui dentro:
     * Desta maneira, a injecao eh realizada dentro de handleError(), 
     * pois quando um erro for processado ele sera capturado sem problemas.
     */
    handleError(error: any): void {
        console.log('Global Error Handler');
        // injecoes de dependencia manuais
        this.location = this.injector.get(LocationStrategy); // obtem instacia de LocationStrategy
        this.userService = this.injector.get(UserService);
        this.logService = this.injector.get(ServerLogService);
        this.router = this.injector.get(Router);

        const message = error.message ? error.message : error.toString; // se tiver uma mensage do erro joga na variavel
        const url = this.location instanceof PathLocationStrategy ? this.location.path() : '/'; // obtem o caminha da url que ocorreu o erro
        
        // redireciona p/ pagina de erro caso nao seja ambiente de producao
        if (environment.production) { this.router.navigate(['/error']); }

        StackTrace.fromError(error)
                    .then(
                        stackFrames => {
                            // joga o valor do array de erros (stackFrames),
                            // em que cada elemento foi convertido para string e separados por quebra de linha
                            const stackAsString = stackFrames.map(sf => sf.toString()).join('\n');

                            console.log('Mensagem a ser enviada ao servidor:');
                            console.log({message, url,  user: this.userService.getUserName(), stack: stackAsString});

                            this.logService.log({message, url, userName: this.userService.getUserName(), stack: stackAsString})
                                                .subscribe(
                                                    () => console.log('Errors logged on server'),
                                                    err => {
                                                        console.log('Fail to sendo to server, error: ', err);
                                                    });
                        }
                    );
    }
}
/**
 * Atraves de Injector.get(NomeDaDependencia) temos acesso a uma instancia criada pelo injector do Angular. 
 * Caso a instancias tenha dependencias, elas serao resolvidas pelo conteiner de injecao do Angular.
 */
