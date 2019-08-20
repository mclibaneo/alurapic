import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    // retorna uma funcao de validacao
    // o validador assincrono traz um objeto Observable ou
    // retorna um valor nulo, caso, nao encontre um username igual
    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                    .valueChanges // emite um evento toda vez que o valor eh mudado
                    .pipe(debounceTime(300)) // aguarda 300ms para realziar novo processamento
                    .pipe(switchMap(userName => { // para nao obter duas emissoes concomitantes
                        return this.signUpService.checkUserNameTaken(userName);
                    }))
                    .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null))
                    .pipe(first()); // obtem o primeiro valor da emissao, indica q foi concluido
        };
    }
}
