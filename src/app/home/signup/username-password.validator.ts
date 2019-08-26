import { ValidatorFn, FormGroup } from '@angular/forms';

/**
 * define uma constante de nome userNamePasswordValidator do tipo ValidatorFn
 * que eh uma funcao que ira verificar se username e password sao iguais 
 * caso sejam iguais retorna um objeto javascript
 * @param formGroup este eh o parametro da funcao
 */
export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;
    if (userName.trim() + password.trim()) {
        // retorna vazio caso nao haja erro, ou se houver, retorna um obj json
        return userName !== password ? null : {userNamePassword: true};
    } else { return null; }
}



